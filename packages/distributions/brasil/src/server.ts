#!/usr/bin/env node

/**
 * Standalone MCP server entry point for @agentgate/brasil.
 *
 * Usage:
 *   npx @agentgate/brasil
 *
 * Features are auto-discovered at build time via
 * `scripts/generate-feature-manifest.mjs`, which scans `packages/features/**`
 * for FEATURE_META exports and writes `src/feature-manifest.generated.ts`.
 *
 * To add a new feature:
 *   1. Drop a package under packages/features/{category}/{subcategory}/{name}
 *   2. Export FEATURE_META from its src/index.ts
 *   3. Run `pnpm run generate:manifest` (automatic on `pnpm build`)
 *
 * The manifest is committed so `npx @agentgate/brasil` works from a clean
 * checkout without a separate build step.
 */

import { FeatureRegistry, createAgentGateServer } from "@agentgate/framework";
import { createMetaTools } from "@agentgate/meta-tools";
import { FEATURE_MANIFEST } from "./feature-manifest.generated.js";

async function main() {
  const registry = new FeatureRegistry();

  // 1. Register every feature from the generated manifest. Each feature
  //    package exports a FEATURE_META object; the manifest is the aggregation.
  const feat = {
    registered: 0,
    skipped: 0,
    errors: [] as string[],
  };
  for (const meta of FEATURE_MANIFEST) {
    try {
      registry.register(meta);
      feat.registered++;
    } catch (err) {
      // Most likely a duplicate id. Log and continue so one bad feature
      // doesn't crash the whole server.
      const message = err instanceof Error ? err.message : String(err);
      feat.errors.push(`${meta.id}: ${message}`);
      feat.skipped++;
    }
  }

  // 2. Register meta-tools as a pseudo-feature. Meta-tools depend on the
  //    registry being populated first so they can index the features.
  const metaTools = createMetaTools(registry);
  registry.register({
    id: "meta-tools",
    name: "Meta Tools",
    category: "agentes",
    subcategory: "meta",
    description:
      "AgentGate meta-tools for discovery, planning, and batch execution",
    descriptionPt:
      "Meta-ferramentas AgentGate para descoberta, planejamento e execução em lote",
    auth: { required: false, type: "none", envVars: [] },
    governance: { enabled: false, governedTools: [] },
    tools: metaTools,
    discovery: {
      tags: ["meta", "tools", "discovery"],
      keywords: ["meta", "tools"],
    },
    tags: ["meta"],
    status: "ga",
  });

  // 3. Startup banner to stderr (keeps stdout clean for MCP protocol).
  process.stderr.write(
    `AgentGate Brasil — ${feat.registered} features + meta-tools registered` +
      (feat.skipped > 0 ? ` (${feat.skipped} skipped)\n` : "\n"),
  );
  if (feat.errors.length > 0) {
    process.stderr.write(
      `  Skipped features:\n${feat.errors.map((e) => `    • ${e}`).join("\n")}\n`,
    );
  }

  const server = createAgentGateServer({
    name: "agentgate-brasil",
    version: "0.1.0",
    registry,
    governanceConfig: process.env.AGENTGATE_API_KEY
      ? {
          apiKey: process.env.AGENTGATE_API_KEY,
          apiUrl: process.env.AGENTGATE_API_URL || "https://api.agentgate.dev",
        }
      : undefined,
  });

  await server.start();
}

main().catch((err) => {
  console.error("Failed to start AgentGate Brasil:", err);
  process.exit(1);
});
