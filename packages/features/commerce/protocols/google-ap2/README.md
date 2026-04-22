# `@agentgate/mcp-google-ap2`

MCP server for Google's [Agent Payments Protocol (AP2)](https://developers.google.com/ap2) — standardized agent-to-agent and agent-to-merchant payments, with extensions for stablecoin (x402) settlement.

```bash
npm install @agentgate/mcp-google-ap2
```

Part of [AgentGate Brasil](https://github.com/ElToro1855/agentgate-brasil). AP2 has 60+ launch partners including Visa, Mastercard, Coinbase, and Checkout.com.

---

## Tools

| Tool | Governed | Description |
|------|----------|-------------|
| `google_ap2_create_intent` | ✅ Yes | Create a payment intent between two AP2-compatible parties. |
| `google_ap2_authorize_intent` | ✅ Yes | Authorize execution on behalf of the principal. |
| `google_ap2_get_intent` | No | Retrieve intent status. |
| `google_ap2_list_intents` | No | List recent intents for the current agent. |

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `GOOGLE_AP2_CLIENT_ID` | ✅ | AP2 OAuth client ID from Google Cloud Console. |
| `GOOGLE_AP2_CLIENT_SECRET` | ✅ | Corresponding client secret. |
| `GOOGLE_AP2_MERCHANT_ID` | Optional | Merchant ID when operating as a receiver. |
| `AGENTGATE_API_KEY` | Optional | Enables governance. |

## Claude Desktop config

```json
{
  "mcpServers": {
    "google-ap2": {
      "command": "npx",
      "args": ["@agentgate/mcp-google-ap2"],
      "env": {
        "GOOGLE_AP2_CLIENT_ID": "...",
        "GOOGLE_AP2_CLIENT_SECRET": "...",
        "AGENTGATE_API_KEY": "ag_live_xxxxx"
      }
    }
  }
}
```

## AP2 + stablecoins (x402 extension)

AP2 ships with an x402 extension that lets agents settle in USDC on Solana/EVM chains via the same AP2 intent flow. If you need that path, pair this package with [`@agentgate/mcp-x402`](../x402).

For LatAm settlement specifically, pair with [`@agentgate/mcp-mpp-tempo`](../mpp-tempo) — AP2 intent authorizes, MPP + OZAV delivers the PIX.

## License

MIT — part of the [AgentGate Brasil](https://github.com/ElToro1855/agentgate-brasil) monorepo.
