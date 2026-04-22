# `@agentgate/mcp-stripe-acp`

MCP server for the [Stripe Agentic Commerce Protocol](https://stripe.com/docs/agentic-commerce) — enables AI agents to create and manage Stripe PaymentIntents with governance enforcement.

```bash
npm install @agentgate/mcp-stripe-acp
```

Part of [AgentGate Brasil](https://github.com/ElToro1855/agentgate-brasil).

---

## Tools

| Tool | Governed | Description |
|------|----------|-------------|
| `stripe_acp_create_payment_intent` | ✅ Yes | Creates a Stripe PaymentIntent for agentic commerce. Runs through policy engine + spend limits. |
| `stripe_acp_confirm_payment_intent` | No | Confirms a PaymentIntent to complete the payment. |
| `stripe_acp_get_payment_intent` | No | Retrieves details of a PaymentIntent by ID. |
| `stripe_acp_list_payment_intents` | No | Lists recent PaymentIntents with optional pagination. |

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `STRIPE_SECRET_KEY` | ✅ | Your Stripe secret key (`sk_test_*` or `sk_live_*`). |
| `AGENTGATE_API_KEY` | Optional | Enables governance. Without it, tools execute directly. |
| `AGENTGATE_API_URL` | Optional | Defaults to `https://api.agentgate.dev`. |

## Claude Desktop config

```json
{
  "mcpServers": {
    "stripe-acp": {
      "command": "npx",
      "args": ["@agentgate/mcp-stripe-acp"],
      "env": {
        "STRIPE_SECRET_KEY": "sk_test_xxxxx",
        "AGENTGATE_API_KEY": "ag_live_xxxxx"
      }
    }
  }
}
```

## Programmatic use

```typescript
import { tools, FEATURE_META } from "@agentgate/mcp-stripe-acp";

// Register with your own FeatureRegistry:
import { FeatureRegistry } from "@agentgate/framework";
const registry = new FeatureRegistry();
registry.register(FEATURE_META);
```

## Governance wrapping

The `create_payment_intent` tool uses [`@agentgate/governance`](../../../../core/governance) to enforce spending limits, counterparty allowlists, and escalation to human reviewers. The `agentgate_tx_id` + `agentgate_token` are injected into Stripe metadata automatically — they become your audit trail key for reconciliation.

## License

MIT — part of the [AgentGate Brasil](https://github.com/ElToro1855/agentgate-brasil) monorepo.
