# `@agentgate/mcp-google-ucp`

MCP server for Google's [Universal Commerce Protocol (UCP)](https://developers.google.com/commerce/protocol) — agent-facing commerce operations: catalog browsing, cart management, checkout, and fulfillment tracking across UCP-compatible merchants.

```bash
npm install @agentgate/mcp-google-ucp
```

Part of [AgentGate Brasil](https://github.com/ElToro1855/agentgate-brasil).

---

## Tools

| Tool | Governed | Description |
|------|----------|-------------|
| `google_ucp_search_catalog` | No | Search product catalogs across UCP merchants. |
| `google_ucp_create_cart` | No | Create a shopping cart from catalog items. |
| `google_ucp_checkout_cart` | ✅ Yes | Execute checkout — governed because money moves. |
| `google_ucp_get_order` | No | Retrieve order status + fulfillment tracking. |

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `GOOGLE_UCP_API_KEY` | ✅ | UCP API key from Google Cloud Console. |
| `GOOGLE_UCP_AGENT_ID` | ✅ | Registered UCP agent identifier. |
| `AGENTGATE_API_KEY` | Optional | Enables governance on checkout. |

## Claude Desktop config

```json
{
  "mcpServers": {
    "google-ucp": {
      "command": "npx",
      "args": ["@agentgate/mcp-google-ucp"],
      "env": {
        "GOOGLE_UCP_API_KEY": "...",
        "GOOGLE_UCP_AGENT_ID": "..."
      }
    }
  }
}
```

## UCP vs AP2

- **UCP** (this package) — commerce-level operations: browse, cart, checkout.
- **AP2** ([`@agentgate/mcp-google-ap2`](../google-ap2)) — payment-level intents for any agent-to-agent money movement.

Most real agentic commerce flows use both: UCP for the shopping experience, AP2 for the payment leg.

## License

MIT — part of the [AgentGate Brasil](https://github.com/ElToro1855/agentgate-brasil) monorepo.
