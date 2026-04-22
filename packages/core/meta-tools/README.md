# `@agentgate/meta-tools`

Framework meta-tools that give AI agents a way to discover, plan, and batch-execute across the hundreds of tools in an [AgentGate Brasil](https://github.com/ElToro1855/agentgate-brasil) server.

```bash
npm install @agentgate/meta-tools
```

Automatically registered by `@agentgate/brasil` as a pseudo-feature at startup. You only need this package directly if you're building a custom distribution.

---

## The 4 meta-tools

| Tool | Purpose |
|------|---------|
| `discover_tools` | Search the registry by natural-language query. Returns ranked matches with descriptions + input schemas. |
| `plan_workflow` | Given a goal, outline a multi-step tool invocation plan the agent can review + edit before executing. |
| `execute_batch` | Run a sequence of tool calls with input/output piping (output of step N feeds step N+1). Stops on first failure. |
| `list_features` | Enumerate registered features grouped by category. Useful for onboarding prompts. |

## Why meta-tools matter

A single AgentGate server exposes 220+ tools. Exposing every descriptor on initial connect costs ~15k tokens per request and buries useful tools.

**Meta-tools-only mode**: host exposes just the 4 meta-tools on startup. Agent discovers and invokes on demand.

- Token usage drops ~100× for narrow tasks
- Tool picker stays uncluttered
- Agent reasoning stays in the problem domain, not in the catalog

## Usage

### In a standalone server

```typescript
import { FeatureRegistry, createAgentGateServer } from "@agentgate/framework";
import { createMetaTools } from "@agentgate/meta-tools";

const registry = new FeatureRegistry();
// ... register features ...

const metaTools = createMetaTools(registry);

// Register meta-tools as a pseudo-feature
registry.register({
  id: "meta-tools",
  name: "Meta Tools",
  category: "agentes",
  subcategory: "meta",
  tools: metaTools,
  // ... other FeatureMeta fields ...
});
```

### In Claude Desktop / Cursor / Cline

Already wired by `@agentgate/brasil`. Just point your MCP host at `npx @agentgate/brasil` and the 4 meta-tools appear alongside the domain tools.

To run in meta-tools-only mode (skip domain tools):

```json
{
  "mcpServers": {
    "agentgate-brasil-meta": {
      "command": "npx",
      "args": ["@agentgate/brasil", "--meta-only"]
    }
  }
}
```

(`--meta-only` support coming in v0.2.)

## Exports

- `createMetaTools(registry)` — returns a `Tool[]` of the 4 meta-tools bound to the given registry
- Individual tool factories: `createDiscoverTool`, `createPlanWorkflowTool`, `createExecuteBatchTool`, `createListFeaturesTool`

## License

MIT — part of the [AgentGate Brasil](https://github.com/ElToro1855/agentgate-brasil) monorepo.
