#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { parseManifest } from "./parser.js";
import { generateFeature } from "./codegen.js";

const args = process.argv.slice(2);
const manifestPath = args[0];
const outputDir = args[1] || ".";

if (!manifestPath) {
  console.error("Usage: agentgate-generate <manifest.yaml> [output-dir]");
  process.exit(1);
}

const yaml = readFileSync(resolve(manifestPath), "utf-8");
const manifest = parseManifest(yaml);
const files = generateFeature(manifest);

for (const file of files) {
  const fullPath = resolve(outputDir, file.path);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, file.content);
  console.log(`Generated: ${file.path}`);
}

console.log(`\nGenerated ${files.length} files for feature "${manifest.id}"`);
