#!/usr/bin/env node
/**
 * generate-feature-manifest.mjs
 *
 * Scans packages/features/** for packages that export a FEATURE_META, and
 * generates:
 *   1. src/feature-manifest.generated.ts — imports + re-exports every FEATURE_META
 *   2. Updates this distribution's package.json to depend on each feature
 *      (workspace:* so pnpm resolves them locally).
 *
 * Run via `pnpm run generate:manifest` before `pnpm build`.
 *
 * This replaces the v0.1 manual-register pattern in server.ts — features are
 * now auto-discovered by the workspace scan at build time. No code changes
 * needed in server.ts when new features are added, just rerun this script.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DISTRIBUTION_DIR = join(__dirname, "..");
const MONOREPO_ROOT = join(DISTRIBUTION_DIR, "..", "..", "..");
const FEATURES_ROOT = join(MONOREPO_ROOT, "packages", "features");
const MANIFEST_PATH = join(
  DISTRIBUTION_DIR,
  "src",
  "feature-manifest.generated.ts",
);
const PKG_JSON_PATH = join(DISTRIBUTION_DIR, "package.json");

/** Recursively find every package.json under features/ that exports FEATURE_META. */
function findFeaturePackages(root) {
  const found = [];
  const stack = [root];
  while (stack.length > 0) {
    const dir = stack.pop();
    let entries;
    try {
      entries = readdirSync(dir);
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (entry === "node_modules" || entry === "dist" || entry.startsWith(".")) continue;
      const fullPath = join(dir, entry);
      let stat;
      try {
        stat = statSync(fullPath);
      } catch {
        continue;
      }
      if (stat.isDirectory()) {
        stack.push(fullPath);
        continue;
      }
      if (entry !== "package.json") continue;
      const pkg = JSON.parse(readFileSync(fullPath, "utf8"));
      if (!pkg.name?.startsWith("@agentgate/")) continue;
      const srcIndex = join(dir, "src", "index.ts");
      let indexContent;
      try {
        indexContent = readFileSync(srcIndex, "utf8");
      } catch {
        continue;
      }
      if (!indexContent.includes("FEATURE_META")) continue;
      found.push({
        name: pkg.name,
        path: dir,
        version: pkg.version || "0.1.0",
      });
    }
  }
  return found.sort((a, b) => a.name.localeCompare(b.name));
}

/** Generate the TypeScript manifest file. */
function generateManifest(features) {
  const importLines = features
    .map((f, i) => `import { FEATURE_META as META_${i} } from "${f.name}";`)
    .join("\n");

  const arrayEntries = features.map((_, i) => `  META_${i},`).join("\n");

  return `/**
 * feature-manifest.generated.ts — AUTO-GENERATED, DO NOT EDIT BY HAND.
 *
 * Regenerate with: pnpm run generate:manifest
 *
 * Source of truth: packages/features/** with FEATURE_META exports.
 * Updated at: ${new Date().toISOString()}
 * Feature count: ${features.length}
 */

import type { FeatureMeta } from "@agentgate/framework";

${importLines}

export const FEATURE_MANIFEST: readonly FeatureMeta[] = [
${arrayEntries}
];
`;
}

/** Update package.json deps with workspace:* for every feature. */
function updatePackageJson(features) {
  const pkg = JSON.parse(readFileSync(PKG_JSON_PATH, "utf8"));
  const existing = pkg.dependencies || {};
  const featureDeps = Object.fromEntries(
    features.map((f) => [f.name, "workspace:*"]),
  );
  pkg.dependencies = { ...existing, ...featureDeps };

  pkg.scripts = pkg.scripts || {};
  pkg.scripts["generate:manifest"] = "node scripts/generate-feature-manifest.mjs";
  pkg.scripts["prebuild"] = "pnpm run generate:manifest";

  writeFileSync(PKG_JSON_PATH, JSON.stringify(pkg, null, 2) + "\n", "utf8");
}

function main() {
  console.log(`Scanning ${relative(process.cwd(), FEATURES_ROOT)} …`);
  const features = findFeaturePackages(FEATURES_ROOT);
  console.log(`Found ${features.length} feature packages with FEATURE_META.`);

  writeFileSync(MANIFEST_PATH, generateManifest(features), "utf8");
  console.log(`Wrote ${relative(process.cwd(), MANIFEST_PATH)}`);

  updatePackageJson(features);
  console.log(
    `Updated ${relative(process.cwd(), PKG_JSON_PATH)} with ${features.length} feature deps.`,
  );

  console.log("\nRun `pnpm install` from monorepo root to link the new deps,");
  console.log("then `pnpm build` to compile the distribution.");
}

main();
