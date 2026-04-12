/**
 * Transaction evaluation request sent to the AgentGate backend.
 */
export interface EvaluationRequest {
  amount: number;
  currency: string;
  rail: string;
  counterparty: {
    id: string;
    name: string;
  };
  category?: string;
  description?: string;
  idempotencyKey?: string;
}

/**
 * Authorization result from AgentGate backend.
 */
export interface AuthorizationResult {
  decision: "allow" | "deny" | "escalate";
  token?: string;
  txId?: string;
  evaluationId?: string;
  reason?: string;
  escalationId?: string;
}

/**
 * Result of a governed tool execution.
 * The execute function must return this shape so withGovernance
 * can confirm/void properly.
 */
export interface GovernedExecutionResult<T = unknown> {
  success: boolean;
  amount: number;
  counterpartyId: string;
  railReference: string;
  output: T;
  error?: string;
}

/**
 * Confirmation payload sent back to AgentGate after execution.
 */
export interface ConfirmationPayload {
  txId: string;
  rail: string;
  amount: number;
  currency: string;
  counterpartyId: string;
  railReference: string;
  executedAt: string;
}

/**
 * Void payload sent back to AgentGate on execution failure.
 */
export interface VoidPayload {
  txId: string;
  reason: string;
  rail: string;
}
