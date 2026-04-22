# `@agentgate/governance`

Governance client + `withGovernance` helper for money-moving tools across [AgentGate Brasil](https://github.com/ElToro1855/agentgate-brasil). Enforces spending limits, counterparty allowlists, human-in-the-loop escalation, and produces an audit trail compliant with EU AI Act + BCB Res. 277.

```bash
npm install @agentgate/governance
```

Used by every feature package that has `governance.enabled: true` (payments, banking, agentic commerce protocols).

---

## The 3-phase pattern

Every governed tool invocation goes through:

1. **Authorize** — evaluate the intended transaction against active policies. Returns `allow`, `deny`, or `escalate`.
2. **Execute** — run the actual business logic (API call, ledger write). Only reached if authorization returned `allow`.
3. **Confirm / Void** — post-execution, report success (confirm) or failure (void) so the policy engine closes the audit row.

This guarantees that **every money-moving action produces a persistent, cryptographically signed decision record** — even if the downstream provider API is unreliable.

## Wrapping a tool

```typescript
import { withGovernance } from "@agentgate/governance";
import { defineTool } from "@agentgate/framework";

export const my_payment_tool = defineTool({
  name: "my_payment_create",
  // ... schema, description ...
  handler: async (input, context) => {
    return withGovernance(
      context.governanceConfig,
      {
        amount: input.amount,
        currency: "BRL",
        rail: "pix",
        counterparty: { id: input.recipient, name: input.name },
        category: "payout",
      },
      async (authResult) => {
        // authResult.decision === "allow" or we wouldn't be here
        // authResult.txId is the policy engine's tx identifier
        // authResult.token is a signed JWT authorizing this spend

        const result = await myProviderClient.createPayment({
          amount: input.amount,
          metadata: {
            agentgate_tx_id: authResult.txId,
            agentgate_token: authResult.token,
          },
        });

        return {
          success: result.status === "approved",
          amount: input.amount,
          counterpartyId: input.recipient,
          railReference: result.id,
          output: result,
        };
      },
    );
  },
});
```

## Configuration

Governance is **opt-in** at the host level. If `context.governanceConfig` is `undefined`, `withGovernance` runs the inner handler directly — no policy, no audit.

To enable:

```typescript
const server = createAgentGateServer({
  registry,
  governanceConfig: {
    apiKey: process.env.AGENTGATE_API_KEY,
    apiUrl: process.env.AGENTGATE_API_URL || "https://api.agentgate.dev",
  },
});
```

## What it's NOT

- Not a payment rail — just the governance layer. Tools still hit providers directly.
- Not chain-specific — works the same for Stripe ACP, Google AP2, Coinbase x402, OZAV MPP/Tempo, and plain REST payment APIs.
- Not synchronous all the way — `escalate` decisions wait for human resolution; tools surface that to the agent as a `pending` status.

## Exports

- `withGovernance(config, request, execute)` — the main wrapper
- `GovernanceClient` — lower-level API if you need direct `evaluate` / `confirm` / `void`
- Types: `GovernanceConfig`, `EvaluationRequest`, `AuthorizationResult`, `GovernedExecutionResult<T>`, `Decision`

## License

MIT — part of the [AgentGate Brasil](https://github.com/ElToro1855/agentgate-brasil) monorepo.
