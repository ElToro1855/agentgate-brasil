#!/usr/bin/env node

import { FeatureRegistry, createAgentGateServer } from "@agentgate/framework";
import { createMetaTools } from "@agentgate/meta-tools";

async function main() {
  const registry = new FeatureRegistry();

  const metaTools = createMetaTools(registry);
  registry.register({
    id: "meta-tools",
    name: "Meta Tools",
    category: "agentes",
    subcategory: "meta",
    description: "AgentGate meta-tools for discovery and planning",
    descriptionPt: "Meta-ferramentas AgentGate para descoberta e planejamento",
    auth: { required: false, type: "none", envVars: [] },
    governance: { enabled: false, governedTools: [] },
    tools: metaTools,
    discovery: { tags: ["meta"], keywords: ["meta"] },
    tags: ["meta"],
    status: "ga",
  });

  const server = createAgentGateServer({
    name: "agentgate-brasil-lite",
    version: "0.1.0",
    registry,
  });

  await server.start();
}

main().catch((err) => {
  console.error("Failed to start:", err);
  process.exit(1);
});
