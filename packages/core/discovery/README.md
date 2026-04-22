# `@agentgate/discovery`

BM25-based tool discovery for [AgentGate Brasil](https://github.com/ElToro1855/agentgate-brasil). Given a registry of 200+ MCP tools, an agent can ask "which tools are relevant to X?" without reading every description.

```bash
npm install @agentgate/discovery
```

---

## Why this exists

A single AgentGate Brasil server exposes 220+ tools across 63 features. Most MCP hosts (Claude Desktop, Cursor, etc.) list every tool in every request, which costs tokens and pollutes context.

`@agentgate/discovery` lets the agent discover tools on demand. The host can:

1. Expose only the 4 `@agentgate/meta-tools` (discovery, planning, batch) on initial connect.
2. Agent calls `search_tools({ query: "send pix" })` → gets ranked matches.
3. Agent calls only the matched tools.

Token usage drops ~10–100× for narrow tasks.

## Usage

```typescript
import { Discovery } from "@agentgate/discovery";
import { FeatureRegistry } from "@agentgate/framework";

const registry = new FeatureRegistry();
// ... register features ...

const discovery = new Discovery(registry);

const matches = discovery.search("send pix to CPF", { limit: 5 });
// [
//   { tool: "mpp_tempo_create_pix_payout", score: 8.7, feature: "mpp-tempo" },
//   { tool: "asaas_create_pix_transfer",   score: 7.2, feature: "asaas"    },
//   { tool: "efi_create_pix_charge",       score: 6.1, feature: "efi"      },
//   ...
// ]
```

## How it works

- BM25 tokenization + ranking over tool name, description, `descriptionPt`, `discovery.tags`, and `discovery.keywords`.
- Bilingual by design — Portuguese and English queries both hit Brazilian service tools.
- No network calls, no embeddings, no vector DB. Runs in-process, returns results in ms.

## Exports

- `Discovery` class — `search()`, `searchByFeature()`, `rebuild()`
- `bm25` — low-level ranking function, exposed for custom indexes
- Types: `SearchOptions`, `SearchResult`

## License

MIT — part of the [AgentGate Brasil](https://github.com/ElToro1855/agentgate-brasil) monorepo.
