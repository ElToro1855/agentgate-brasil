# `@agentgate/mcp-x402`

MCP server for Coinbase's [x402](https://www.x402.org) protocol — HTTP 402-based agentic payments on Solana + EVM chains.

```bash
npm install @agentgate/mcp-x402
```

Part of [AgentGate Brasil](https://github.com/ElToro1855/agentgate-brasil).

---

## What x402 does

x402 is a lightweight HTTP 402 Payment Required protocol for machine-to-machine payments:

1. Client hits a paid endpoint → server returns `402` with an `X-PAYMENT-REQUIRED` challenge
2. Client signs a payment (USDC on Solana/Base/Polygon etc.) → retries with `X-PAYMENT` header
3. Server verifies → returns content + `X-PAYMENT-RESPONSE` receipt

It's simpler than Tempo MPP (no IETF auth scheme, no off-chain voucher sessions) and currently has ~$24M total volume with 5,000+ merchants (50× growth in 6 months per the Polygon Enterprise Report).

## Tools

| Tool | Governed | Description |
|------|----------|-------------|
| `x402_create_payment` | ✅ Yes | Initiate an x402 payment to a merchant URL. |
| `x402_verify_payment` | No | Verify a received x402 credential (server-side). |
| `x402_get_facilitator_info` | No | Query the active x402 facilitator for status / fees. |

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `X402_PRIVATE_KEY` | ✅ | Agent's signing key (ed25519 for Solana, secp256k1 for EVM). |
| `X402_FACILITATOR_URL` | Optional | Defaults to Coinbase's hosted facilitator. |
| `AGENTGATE_API_KEY` | Optional | Enables governance. |

## Claude Desktop config

```json
{
  "mcpServers": {
    "x402": {
      "command": "npx",
      "args": ["@agentgate/mcp-x402"],
      "env": {
        "X402_PRIVATE_KEY": "..."
      }
    }
  }
}
```

## x402 vs Tempo MPP

x402 is the peer protocol to Tempo's MPP — both implement HTTP 402 for agent payments, but on different rails:

- **x402** — Solana / Base / Polygon USDC, Coinbase-led
- **MPP (Tempo)** — Tempo chain pathUSD/USDC, Stripe + Tempo co-authored at IETF

Use x402 for US-facing flows, MPP for LatAm flows (via [`@agentgate/mcp-mpp-tempo`](../mpp-tempo)). Both live side-by-side in this monorepo.

## License

MIT — part of the [AgentGate Brasil](https://github.com/ElToro1855/agentgate-brasil) monorepo.
