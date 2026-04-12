# AgentGate Brasil 🇧🇷

> The most comprehensive MCP server suite for AI agents operating in Brazil.

**69 packages. 160+ tools. Commerce + Government + Consumer + Agentic Protocols.**

Payments, fiscal, banking, logistics, government data, consumer services, and agentic commerce protocols — with built-in governance on every money-moving action.

**Open source. MIT licensed. Built by [OZAV](https://ozav.io).**

---

## Quick Start

```bash
npx @agentgate/brasil-setup
```

Or manually add to Claude Desktop (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "agentgate-brasil": {
      "command": "npx",
      "args": ["@agentgate/brasil-lite"]
    }
  }
}
```

## What's Included

### Commerce (38 features)

| Category | Features |
|----------|----------|
| **Agentic Protocols** | Stripe ACP, x402, Google UCP, Google AP2 |
| **BR Payments** | Zoop, Asaas, Pagar.me, PagSeguro, iugu, EBANX, EFI, Vindi, Cielo, Stone, Celcoin |
| **BR Fiscal** | Nuvem Fiscal, Focus NFe, Conta Azul |
| **BR Logistics** | Melhor Envio, Correios, VTEX |
| **BR Banking** | Stark Bank, Open Finance |
| **BR ERP** | Omie, Bling, Tiny |
| **BR Communication** | Z-API, Evolution API, Zenvia, RD Station, Take Blip |
| **Crypto** | Mercado Bitcoin |
| **Consumer** | iFood, Mercado Livre, 99, Rappi, Amazon BR, Magalu |

### Government Data (16 features)

| Category | Features |
|----------|----------|
| **Identity** | BrasilAPI (CEP, CNPJ, banks), Receita Federal, SERPRO |
| **Economic** | BACEN (Selic, IPCA, câmbio), IBGE, B3 |
| **Legislative** | Câmara dos Deputados, Senado Federal, Diário Oficial |
| **Judicial** | DataJud, Jurisprudência (STF, STJ) |
| **Electoral** | TSE |
| **Environmental** | INPE (queimadas), ANA (recursos hídricos) |
| **Health** | DataSUS, CNES |
| **Transparency** | Portal da Transparência, TCU |
| **Procurement** | PNCP, Compras.gov |

### AI Agents (4 features)

| Agent | What it does |
|-------|-------------|
| **Redator Oficial** | Writes ofícios, pareceres, portarias with real data |
| **Analista Fiscal** | Simples Nacional, tax regime comparison, DRE |
| **Consultor Jurídico** | Jurisprudence search, legal analysis, deadlines |
| **Monitor Compliance** | Entity checks, sanctions, risk alerts |

### Meta-Tools (5 tools)

| Tool | Description |
|------|-------------|
| `listar_features` | List all available features |
| `recomendar_tools` | BM25 search for relevant tools |
| `planejar_consulta` | Multi-tool execution planning |
| `executar_lote` | Parallel batch execution |
| `verificar_governanca` | Governance status check |

## Distributions

| Package | What's included |
|---------|----------------|
| `@agentgate/brasil` | Everything — all features + governance |
| `@agentgate/brasil-lite` | Free, no-auth features only (BrasilAPI, BACEN, IBGE, etc.) |

## Governance

Every money-moving tool is wrapped with `withGovernance` — a pattern that optionally evaluates transactions against policies before execution.

```
Agent → AgentGate Policy Engine → ALLOW/DENY/ESCALATE → Execute → Confirm/Void
```

Without governance config: tools execute directly.
With governance config: tools are evaluated against spending limits, counterparty rules, and risk policies.

[Learn more about governance →](https://mcp.app.br)

## Development

```bash
git clone https://github.com/ElToro1855/agentgate-brasil.git
cd agentgate-brasil
pnpm install
pnpm build
pnpm test
```

### Adding a new feature

1. Write a YAML manifest in `manifests/`
2. Generate: `node packages/core/generator/dist/cli.js manifests/my-api.yaml packages/`
3. Scaffold: add `package.json`, `tsconfig.json`, create `src/`
4. Build: `pnpm build`

## Architecture

```
packages/
├── core/
│   ├── framework/      # MCP server + auto-registry + types
│   ├── discovery/      # BM25 smart tool search
│   ├── governance/     # withGovernance pattern
│   ├── meta-tools/     # 5 cross-feature meta-tools
│   └── generator/      # YAML → feature module codegen
├── features/
│   ├── commerce/       # 38 payment/fiscal/logistics features
│   ├── data/           # 16 government data features
│   └── agentes/        # 4 AI meta-agents
└── distributions/
    ├── brasil/          # Full suite
    └── brasil-lite/     # Free tier
```

## License

MIT — [OZAV](https://ozav.io)

## Links

- **Website:** [mcp.app.br](https://mcp.app.br) (coming soon)
- **GitHub:** [github.com/ElToro1855/agentgate-brasil](https://github.com/ElToro1855/agentgate-brasil)
- **Built by:** [OZAV](https://ozav.io) — Brazilian AI automation infrastructure
