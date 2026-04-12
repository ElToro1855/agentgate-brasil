#!/usr/bin/env node

/**
 * Standalone MCP server entry point for @agentgate/brasil.
 *
 * Usage:
 *   npx @agentgate/brasil
 *
 * This dynamically discovers all installed feature packages and registers them.
 * For v0.1, features must be registered manually (auto-discovery from node_modules comes later).
 */

import { FeatureRegistry, createAgentGateServer } from "@agentgate/framework";
import { createMetaTools } from "@agentgate/meta-tools";

async function main() {
  const registry = new FeatureRegistry();

  // In v0.1, features are registered by importing them directly.
  // In v1.0, this will use auto-discovery from node_modules.
  // For now, this server starts with just meta-tools available.
  // Users can import individual feature packages and register them.

  const metaTools = createMetaTools(registry);

  // Register meta-tools as a pseudo-feature
  registry.register({
    id: "meta-tools",
    name: "Meta Tools",
    category: "agentes",
    subcategory: "meta",
    description: "AgentGate meta-tools for discovery, planning, and batch execution",
    descriptionPt: "Meta-ferramentas AgentGate para descoberta, planejamento e execução em lote",
    auth: { required: false, type: "none", envVars: [] },
    governance: { enabled: false, governedTools: [] },
    tools: metaTools,
    discovery: { tags: ["meta", "tools", "discovery"], keywords: ["meta", "tools"] },
    tags: ["meta"],
    status: "ga",
  });

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
