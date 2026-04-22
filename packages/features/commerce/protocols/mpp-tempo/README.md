# `@agentgate/mcp-mpp-tempo`

MCP server exposing the **Machine Payments Protocol (MPP)** on **Tempo** for AI agents — settle `pathUSD` on Tempo, receive instant PIX delivery to any Brazilian bank account via [OZAV](https://ozav.io)'s regulated LatAm corridor.

> **Status: beta.** Sandbox (testnet + simulated PIX) is live. Production PIX (live Lumx settlement) is behind `AGENTGATE_PIX_MODE=live` and requires an operator KYB.

---

## What this does

- Agent calls the `mpp_tempo_create_pix_payout` tool with `{ pix_key, amount_brl, ... }`.
- The AgentGate policy engine evaluates spending rules, KYB, allowlists.
- If allowed, the engine issues an [HTTP 402 Payment Required](https://paymentauth.org) challenge with an [mppx](https://mpp.dev)-signed intent.
- The agent signs a `TIP-20` transfer on Tempo (pathUSD on testnet, USDC on mainnet) to OZAV's wallet and retries.
- OZAV verifies the on-chain payment via Tempo RPC + executes PIX via Lumx.
- Agent receives a `Payment-Receipt` header and the PIX `endToEndId`.

This is the first regulated LatAm settlement layer in the Tempo Payments Directory ecosystem. Other MPP/Tempo partners serve global corridors — this one serves Brazil's PIX rail with full BCB compliance (Lei 14.286/2021, Resolução 277 audit trail).

---

## Install

```bash
npm install @agentgate/mcp-mpp-tempo
# or, for a full Brasil server with all 63 features:
npx @agentgate/brasil
```

---

## Zero-setup sandbox

No signup, no API key. Copy-paste this to hit the live testnet:

```typescript
import { MppTempoClient } from "@agentgate/mcp-mpp-tempo";

const client = new MppTempoClient({}); // defaults to public sandbox key
const result = await client.createPixPayout({
  pix_key: "test@ozav.io",
  amount_brl: 100.00,
  beneficiary_name: "Test Recipient",
});

if (result.status === "payment_required") {
  // Use the `mppx` client SDK to sign the Tempo transaction and retry.
  console.log("Challenge:", result.challengeId);
  console.log("WWW-Authenticate:", result.challengeHeader);
} else if (result.status === "completed") {
  console.log("PIX settled:", result.pixTransactionId);
  console.log("Exchange rate:", result.exchangeRate);
  console.log("USDC charged:", result.amountUsdcCharged);
}
```

With the [mppx](https://mpp.dev/sdk/typescript) client SDK installed, the 402 roundtrip is handled transparently — your `fetch` call just returns `200 completed`.

---

## Going live — required `recipient` fields

In sandbox / simulate mode, only `pix_key` + `amount_brl` are required. **In live mode** (production API key + `AGENTGATE_PIX_MODE=live` on the bridge), Lumx KYBs every recipient bank account on creation. You must pass the full `recipient` object:

```typescript
await client.createPixPayout({
  pix_key: "recipient@company.com.br",
  amount_brl: 500.00,
  beneficiary_name: "Acme Ltda",
  reference: "invoice-2026-0042",
  recipient: {
    legal_name: "Acme Ltda",
    tax_id: "12345678000190",          // CPF (11) or CNPJ (14), digits only
    email: "finance@acme.com.br",
    holder_type: "BUSINESS",            // or "INDIVIDUAL"
    holder_relationship: "CUSTOMER",    // default
    address: {
      line1: "Av. Paulista 1000",
      city: "São Paulo",
      state: "SP",
      postalCode: "01310-100",
      country: "BR",
    },
    incorporation_date: "2020-01-15",   // required for BUSINESS
    // birth_date required for INDIVIDUAL (YYYY-MM-DD)
  },
});
```

Missing fields return a 400 with `error_code: "INCOMPLETE_RECIPIENT_KYB"` and a list of the missing paths — no settlement occurs.

**Live mode also returns asynchronously.** Expect `status: "processing"` with a `poll_url` — poll it at ≤30 req/min until `paid` or `refund_pending`. The `getChallengeStatus()` helper wraps this:

```typescript
if (result.status === "processing") {
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    const poll = await client.getChallengeStatus(result.pixTransactionId);
    if (poll.status === "paid" || poll.status === "refund_pending") break;
  }
}
```

---

## Usage in MCP hosts

### Claude Desktop / Cursor / Cline

The tool is exposed as `mpp_tempo_create_pix_payout` once the server is connected. Add to your MCP config:

```json
{
  "mcpServers": {
    "agentgate-brasil": {
      "command": "npx",
      "args": ["@agentgate/brasil"],
      "env": {
        "AGENTGATE_API_KEY": "ag_sandbox_demo_READONLY_00000000000000000",
        "AGENTGATE_API_URL": "https://agentic-payments-sage.vercel.app"
      }
    }
  }
}
```

For production, replace the sandbox key with your dashboard-provisioned `ag_live_*` key.

### Direct programmatic use

```typescript
import { tools } from "@agentgate/mcp-mpp-tempo";

// tools is a readonly array of defineTool() outputs, ready to register
// with any MCP server or agent framework that speaks the @agentgate/framework tool spec.
```

---

## Tools exposed

| Tool | Description | Governed |
|------|-------------|----------|
| `mpp_tempo_create_pix_payout` | Send BRL via PIX, settled by agent paying pathUSD on Tempo. Returns `payment_required` (402) or `completed`. | ✅ Yes — policy engine evaluates amount, counterparty, spend-to-date. |
| `mpp_tempo_get_challenge_status` | Poll a challenge ID for status (`pending`, `paid`, `pending_human_review`, `expired`). | No |

---

## Environment variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `AGENTGATE_API_KEY` | Public sandbox key | Authenticates to the AgentGate policy engine. |
| `AGENTGATE_API_URL` | `https://agentic-payments-sage.vercel.app` | Override for self-hosted deployments. |

---

## Governance

The `mpp_tempo_create_pix_payout` tool is wrapped in `withGovernance()`. When the MCP host has `AGENTGATE_API_KEY` set to a production key, the tool call:

1. Submits an evaluation request to the policy engine (amount, rail, counterparty, context).
2. Receives `allow`, `deny`, or `escalate`.
3. On `allow`, the policy engine issues the HTTP 402 challenge.
4. After PIX settles, the tool calls `client.confirm()` to close the transaction audit loop.

This matches the same pattern as [`@agentgate/mcp-stripe-acp`](../stripe-acp) — policy engine is rail-agnostic, every rail hooks in the same way.

---

## Tempo network details

| Network | Chain ID | RPC | pathUSD / USDC |
|---------|----------|-----|----------------|
| **Testnet (Moderato)** | `42431` | `https://rpc.moderato.tempo.xyz` | `0x20c0...0000` (pathUSD) |
| **Mainnet (Tempo)** | `4217` | `https://rpc.tempo.xyz` | `0x20C0...E8b50` (USDC) |

Testnet faucet: [docs.tempo.xyz/quickstart/faucet](https://docs.tempo.xyz/quickstart/faucet) — 1M pathUSD per drip.

---

## Full docs

Flow diagram, troubleshooting, direct-bridge access, mainnet onboarding:
👉 [**agentic-payments-sage.vercel.app/docs/agentgate**](https://agentic-payments-sage.vercel.app/docs/agentgate)

---

## License

MIT — same as the rest of the [AgentGate Brasil](https://github.com/ElToro1855/agentgate-brasil) monorepo.

## Contact

- Partnerships: [partners@ozav.io](mailto:partners@ozav.io)
- Issues: [GitHub](https://github.com/ElToro1855/agentgate-brasil/issues)
