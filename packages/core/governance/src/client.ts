import type { GovernanceConfig } from "@agentgate/framework";
import type {
  EvaluationRequest,
  AuthorizationResult,
  ConfirmationPayload,
  VoidPayload,
} from "./types.js";

/**
 * HTTP client for the AgentGate governance backend.
 */
export class GovernanceClient {
  private apiUrl: string;
  private apiKey: string;

  constructor(config: GovernanceConfig) {
    this.apiUrl = config.apiUrl.replace(/\/$/, "");
    this.apiKey = config.apiKey;
  }

  /**
   * Evaluate a transaction against policies.
   */
  async evaluate(request: EvaluationRequest): Promise<AuthorizationResult> {
    const res = await fetch(`${this.apiUrl}/api/v1/evaluate`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent_id: "agentgate_governed_tool",
        amount: request.amount,
        currency: request.currency,
        rail: request.rail,
        counterparty: request.counterparty,
        context: {
          category: request.category ?? "payment",
          description: request.description ?? "",
        },
        idempotency_key: request.idempotencyKey,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: { message: "Governance unavailable" } }));
      throw new Error(err.error?.message || `Governance returned ${res.status}`);
    }

    const data = await res.json();

    return {
      decision: data.decision,
      token: data.authorization?.token,
      txId: data.authorization?.tx_id,
      evaluationId: data.evaluation_id,
      reason: data.reason,
      escalationId: data.escalation_id,
    };
  }

  /**
   * Confirm a successful execution.
   */
  async confirm(payload: ConfirmationPayload): Promise<void> {
    await fetch(`${this.apiUrl}/api/v1/confirm`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tx_id: payload.txId,
        rail: payload.rail,
        amount: Math.round(payload.amount * 100),
        currency: payload.currency,
        counterparty_id: payload.counterpartyId,
        rail_reference: payload.railReference,
        executed_at: payload.executedAt,
      }),
    }).catch(() => {
      // Fire and forget — don't block on confirm failure
    });
  }

  /**
   * Void a failed execution.
   */
  async void(payload: VoidPayload): Promise<void> {
    await fetch(`${this.apiUrl}/api/v1/confirm/${payload.txId}/void`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reason: payload.reason,
        rail: payload.rail,
      }),
    }).catch(() => {
      // Fire and forget
    });
  }
}
