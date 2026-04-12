import type { GovernanceConfig } from "@agentgate/framework";
import { GovernanceClient } from "./client.js";
import { GovernanceDenialError, GovernanceEscalationError } from "./errors.js";
import type {
  EvaluationRequest,
  AuthorizationResult,
  GovernedExecutionResult,
} from "./types.js";

/**
 * Wrap a tool's execution with governance: authorize → execute → confirm/void.
 *
 * If governanceConfig is undefined, the tool executes directly without policy checks.
 * This is the core pattern every money-moving tool uses.
 */
export async function withGovernance<T>(
  governanceConfig: GovernanceConfig | undefined,
  request: EvaluationRequest,
  execute: (authResult: AuthorizationResult) => Promise<GovernedExecutionResult<T>>,
): Promise<T> {
  // No governance configured — execute directly
  if (!governanceConfig) {
    const noAuthResult: AuthorizationResult = {
      decision: "allow",
      token: undefined,
      txId: undefined,
    };
    const result = await execute(noAuthResult);
    return result.output;
  }

  const client = new GovernanceClient(governanceConfig);

  // Step 1: Authorize
  const authResult = await client.evaluate(request);

  if (authResult.decision === "deny") {
    throw new GovernanceDenialError(authResult.reason, authResult.evaluationId);
  }

  if (authResult.decision === "escalate") {
    throw new GovernanceEscalationError(authResult.evaluationId, authResult.escalationId);
  }

  // Step 2: Execute
  let execResult: GovernedExecutionResult<T>;
  try {
    execResult = await execute(authResult);
  } catch (error) {
    // Execution failed — void the authorization
    if (authResult.txId) {
      await client.void({
        txId: authResult.txId,
        reason: error instanceof Error ? error.message : String(error),
        rail: request.rail,
      });
    }
    throw error;
  }

  // Step 3: Confirm or void based on success
  if (authResult.txId) {
    if (execResult.success) {
      await client.confirm({
        txId: authResult.txId,
        rail: request.rail,
        amount: execResult.amount,
        currency: request.currency,
        counterpartyId: execResult.counterpartyId,
        railReference: execResult.railReference,
        executedAt: new Date().toISOString(),
      });
    } else {
      await client.void({
        txId: authResult.txId,
        reason: execResult.error || "Execution failed",
        rail: request.rail,
      });
    }
  }

  return execResult.output;
}
