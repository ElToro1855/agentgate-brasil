/**
 * Thrown when AgentGate denies a transaction.
 */
export class GovernanceDenialError extends Error {
  readonly evaluationId?: string;
  readonly reason?: string;

  constructor(reason?: string, evaluationId?: string) {
    super(`Transaction denied: ${reason || "policy violation"}`);
    this.name = "GovernanceDenialError";
    this.reason = reason;
    this.evaluationId = evaluationId;
  }
}

/**
 * Thrown when AgentGate escalates a transaction for human review.
 */
export class GovernanceEscalationError extends Error {
  readonly evaluationId?: string;
  readonly escalationId?: string;

  constructor(evaluationId?: string, escalationId?: string) {
    super("Transaction escalated for human review");
    this.name = "GovernanceEscalationError";
    this.evaluationId = evaluationId;
    this.escalationId = escalationId;
  }
}
