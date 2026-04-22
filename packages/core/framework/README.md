# `@agentgate/framework`

Core MCP framework for [AgentGate Brasil](https://github.com/ElToro1855/agentgate-brasil) — `FeatureRegistry`, `createAgentGateServer`, `FeatureMeta` / `Tool` types, and the `defineTool` helper.

Every feature package in AgentGate Brasil (63+) depends on this.

```bash
npm install @agentgate/framework
```

---

## Concepts

- **Feature** — a cohesive group of tools around one service (e.g. Asaas, Omie, Receita Federal). Declared as a single `FeatureMeta` export.
- **Tool** — one action an agent can invoke. Has a name, description, zod input schema, and a handler function. Created via `defineTool`.
- **Registry** — the runtime catalog of registered features. Produces the MCP tool list exposed to the agent host.

## Defining a feature

```typescript
import { defineTool, type FeatureMeta } from "@agentgate/framework";
import { z } from "zod";

const myTool = defineTool({
  name: "my_service_do_thing",
  description: "Does a thing in the service",
  inputSchema: z.object({ amount: z.number() }),
  discovery: { tags: ["service"], keywords: ["do thing"] },
  handler: async (input, context) => {
    // context.env, context.governanceConfig are provided at runtime
    return { ok: true };
  },
});

export const FEATURE_META: FeatureMeta = {
  id: "my-service",
  name: "My Service",
  category: "commerce",
  subcategory: "br-payments",
  description: "...",
  descriptionPt: "...",
  auth: { required: true, type: "bearer", envVars: ["MY_API_KEY"] },
  governance: { enabled: false, governedTools: [] },
  tools: [myTool],
  discovery: { tags: ["service"], keywords: [] },
  tags: ["service"],
  status: "beta",
};
```

## Creating a server

```typescript
import {
  FeatureRegistry,
  createAgentGateServer,
} from "@agentgate/framework";
import { FEATURE_META as myService } from "./my-feature.js";

const registry = new FeatureRegistry();
registry.register(myService);

const server = createAgentGateServer({
  name: "my-agent-server",
  version: "1.0.0",
  registry,
});

await server.start(); // Listens on stdio (MCP transport)
```

In the full AgentGate Brasil distribution, 63 feature packages are auto-registered via a generated manifest — see [`@agentgate/brasil`](../../distributions/brasil).

## Exports

- `FeatureRegistry` — `register()`, `getAllFeatures()`, `getAllTools()`, `filterFeatures()`
- `createAgentGateServer(config)` — MCP server builder
- `defineTool(spec)` — tool factory with typed handler context
- Types: `FeatureMeta`, `Tool`, `FeatureAuth`, `FeatureGovernance`, `ToolDiscovery`, `GovernedExecutionResult`, `EvaluationRequest`, `AuthorizationResult`

## License

MIT — part of the [AgentGate Brasil](https://github.com/ElToro1855/agentgate-brasil) monorepo.
