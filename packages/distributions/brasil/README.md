# AgentGate Brasil

**The MCP server suite for AI agents operating in Brazil** — 63 integrations covering payments, fiscal, banking, ERP, logistics, government data, and agentic commerce protocols, all unified under a single MCP endpoint with optional policy governance.

```bash
npx @agentgate/brasil
```

Zero-config. Connects to your AI agent host (Claude Desktop, Cursor, Cline, ChatGPT, LangChain, CrewAI) and exposes 220+ tools ready to call.

---

## Why AgentGate

AI agents that touch money, fiscal obligations, or government systems in Brazil face three recurring problems:

1. **Every integration looks different.** Zoop's PIX API is nothing like Gerencianet's, which is nothing like Asaas's. Before AgentGate, every agent builder wrote their own adapter per provider.
2. **Regulatory reality.** BCB, Receita Federal, COAF, LGPD. A payment SDK that doesn't log in the right format is useless for a regulated business.
3. **Agents don't have settlement rails.** Stablecoins on one side, PIX on the other, no clean way to bridge.

AgentGate Brasil is the unified layer. One server, 63 integrations, governance hooks that plug into a policy engine, and — uniquely — a first-class implementation of Tempo's Machine Payments Protocol into PIX (see `@agentgate/mcp-mpp-tempo`).

---

## What's inside — 63 features, 220 tools

### 🇧🇷 Brazilian payment rails (11)
Zoop, Pagar.me, Cielo, PagSeguro, Asaas, Stone, Iugu, eBanx, Celcoin, Vindi, Gerencianet (EFI)

### 💳 Agentic commerce protocols (5)
Stripe ACP, Google AP2, Google UCP, Coinbase x402, **OZAV MPP + PIX via Tempo** (`@agentgate/mcp-mpp-tempo`)

### 🏦 Brazilian banking (2)
Stark Bank, Open Finance Brasil

### 📑 ERPs + fiscal (6)
Omie, Tiny, Bling, Conta Azul, Focus NFe, Nuvem Fiscal

### 📦 Logistics (3)
Correios, Melhor Envio, VTEX

### 💬 Communication (5)
WhatsApp via Z-API + Take Blip + Evolution API + Zenvia, RD Station CRM

### 🏛 Government + transparency (16)
Receita Federal, SERPRO, BACEN, B3, IBGE, INPE, Câmara dos Deputados, Senado, TCU, TSE, DataJud, Jurisprudência, Diário Oficial, CNES, DataSUS, Portal da Transparência, Compras Gov, PNCP

### 🛒 Consumer APIs (6)
Mercado Livre, Amazon BR, Magalu, iFood, 99, Rappi

### 🪙 Crypto (1)
Mercado Bitcoin

### 🤖 AI agent meta-tools (4)
Compliance monitor, fiscal analyst, legal consultant, official writer

---

## Quick start

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "agentgate-brasil": {
      "command": "npx",
      "args": ["@agentgate/brasil"]
    }
  }
}
```

Restart Claude Desktop. All 220 tools are now available to your agent.

### Cursor, Cline, ChatGPT, LangChain, CrewAI

Same pattern — point your MCP host at `npx @agentgate/brasil`. Per-host config at [docs.agentgate.dev](https://docs.agentgate.dev).

### Programmatic (bring your own MCP server)

```typescript
import { FEATURE_MANIFEST } from "@agentgate/brasil/manifest";
import { FeatureRegistry, createAgentGateServer } from "@agentgate/framework";

const registry = new FeatureRegistry();
for (const meta of FEATURE_MANIFEST) registry.register(meta);

const server = createAgentGateServer({
  name: "my-agent-server",
  version: "1.0.0",
  registry,
});
await server.start();
```

### Single-feature packages

Every feature is also published as a standalone package, so you can install just what you need:

```bash
npm install @agentgate/mcp-asaas        # just Asaas
npm install @agentgate/mcp-mpp-tempo    # just MPP + PIX via Tempo
npm install @agentgate/mcp-receita-federal  # just RF lookups
```

---

## Governance (optional)

Tools that move money or submit fiscal filings are marked `governed: true` in their `FeatureMeta`. When `AGENTGATE_API_KEY` is set, those tools route through the [AgentGate policy engine](https://agentic-payments-sage.vercel.app) before execution:

```json
{
  "mcpServers": {
    "agentgate-brasil": {
      "command": "npx",
      "args": ["@agentgate/brasil"],
      "env": {
        "AGENTGATE_API_KEY": "ag_live_xxxxx",
        "AGENTGATE_API_URL": "https://agentic-payments-sage.vercel.app"
      }
    }
  }
}
```

The engine enforces spending limits, counterparty allowlists, escalation to human reviewers, and produces a compliance audit trail in the EU AI Act + LGPD format. Free tier: 1,000 evaluations/month.

No key = direct execution, no policy enforcement. Useful for prototyping.

---

## MPP + PIX for agent payments

The flagship integration in this release is `@agentgate/mcp-mpp-tempo` — the first production Machine Payments Protocol adapter for a LatAm settlement rail.

```typescript
// Agent calls the tool
await mpp_tempo_create_pix_payout({
  pix_key: "recipient@example.com",
  amount_brl: 100.00,
  beneficiary_name: "Example Recipient",
});

// Under the hood:
//  1. Policy engine evaluates (spend limit, KYB, allowlist)
//  2. Returns HTTP 402 with an mppx-signed challenge
//  3. mppx client SDK signs a Tempo TIP-20 transfer to OZAV's wallet
//  4. OZAV verifies on-chain, executes PIX via Lumx
//  5. Agent receives receipt + BCB-compliant audit trail
```

Full flow docs: [agentic-payments-sage.vercel.app/docs/agentgate](https://agentic-payments-sage.vercel.app/docs/agentgate)

**Public sandbox** — no signup needed:

```bash
export AGENTGATE_API_KEY="ag_sandbox_demo_READONLY_00000000000000000"
# runs against Tempo Moderato testnet + simulated PIX
```

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│ AI Agent host (Claude, Cursor, ChatGPT, LangChain, ...)      │
└──────────────────────────────────────────────────────────────┘
                            │ MCP over stdio
┌──────────────────────────────────────────────────────────────┐
│ @agentgate/brasil — 63 features, 220 tools                   │
│ ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐   │
│ │ FeatureRegistry │─▶│ Feature Manifest│─▶│ withGovernance│   │
│ └─────────────────┘  └─────────────────┘  └──────┬───────┘   │
│                                                   │           │
│         ┌──────────────────────────┬──────────────┴─────┐    │
│         ▼                          ▼                    ▼     │
│  Direct execution             Stripe-like REST      Agentic   │
│  (read APIs,                  (Asaas, Pagar.me,    commerce   │
│  government queries)          Stone, ...)        (ACP, AP2,    │
│                                                  x402, MPP)     │
└──────────────────────────────────────────────────────────────┘
         │                          │                    │
         ▼                          ▼                    ▼
  [external APIs]          [payment providers]   [AgentGate policy
                                                  engine + rails]
```

The framework is protocol-agnostic. Stripe ACP, Google AP2, Coinbase x402, and OZAV MPP/Tempo all hook in the same way: a `FeatureMeta` with a `tools` array whose governed handlers wrap calls in `withGovernance()`.

---

## Adding a new feature

Zero-touch for the distribution. Drop a package under `packages/features/{category}/{subcategory}/{name}/`, export `FEATURE_META`, commit.

```typescript
// packages/features/commerce/br-payments/foo/src/index.ts
import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "foo",
  name: "Foo Payments",
  category: "commerce",
  subcategory: "br-payments",
  description: "...",
  descriptionPt: "...",
  auth: { required: true, type: "bearer", envVars: ["FOO_API_KEY"] },
  governance: { enabled: true, governedTools: ["foo_create_charge"] },
  tools,
  discovery: { tags: [...], keywords: [...] },
  tags: [...],
  status: "alpha",
};
```

Run `pnpm build` at the repo root. The `prebuild` hook scans the workspace, regenerates `feature-manifest.generated.ts`, and rebuilds the distribution. Done.

---

## Production considerations

- **API keys** — each feature reads from `env` (set via your MCP host config). Never hardcoded.
- **Rate limits** — handled per-feature via the underlying provider SDK.
- **Governance** — optional. Without `AGENTGATE_API_KEY`, tools execute directly.
- **Error handling** — every tool returns a structured `GovernedExecutionResult` with `success`, `error`, and `railReference` fields.
- **Audit** — when governance is enabled, every money-moving call produces an `evaluation_id` + `tx_id` written to the policy engine's ledger, exportable as a compliance report.

---

## Related projects

- [mppx](https://mpp.dev) — TypeScript SDK for the Machine Payments Protocol (by wevm)
- [agentic-payments](https://agentic-payments-sage.vercel.app) — commercial AgentGate policy engine
- [OZAV](https://ozav.io) — the regulated LatAm settlement layer behind `@agentgate/mcp-mpp-tempo`

---

## License

MIT. Free to use commercially. Contributions welcome via [GitHub](https://github.com/ElToro1855/agentgate-brasil).

## Contact

- Partnerships: [partners@ozav.io](mailto:partners@ozav.io)
- Issues: [GitHub Issues](https://github.com/ElToro1855/agentgate-brasil/issues)
