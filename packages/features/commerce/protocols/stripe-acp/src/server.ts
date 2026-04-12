#!/usr/bin/env node

import { FeatureRegistry, createAgentGateServer } from "@agentgate/framework";
import { FEATURE_META } from "./index.js";

const registry = new FeatureRegistry();
registry.register(FEATURE_META);

const server = createAgentGateServer({
  name: "agentgate-mcp-stripe-acp",
  version: "0.1.0",
  registry,
  governanceConfig: process.env.AGENTGATE_API_KEY
    ? {
        apiKey: process.env.AGENTGATE_API_KEY,
        apiUrl: process.env.AGENTGATE_API_URL || "https://api.agentgate.dev",
      }
    : undefined,
});

server.start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
