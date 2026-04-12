import { describe, it, expect, vi, beforeEach } from "vitest";
import { withGovernance } from "../src/with-governance.js";
import { GovernanceDenialError, GovernanceEscalationError } from "../src/errors.js";
import type { AuthorizationResult, GovernedExecutionResult } from "../src/types.js";

// Mock global fetch
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
});

const mockRequest = {
  amount: 100,
  currency: "BRL",
  rail: "pix",
  counterparty: { id: "test", name: "Test" },
};

describe("withGovernance — no config (bypass mode)", () => {
  it("executes directly without calling governance API", async () => {
    const result = await withGovernance(
      undefined,
      mockRequest,
      async () => ({
        success: true,
        amount: 100,
        counterpartyId: "test",
        railReference: "ref-123",
        output: { transactionId: "tx-123" },
      }),
    );

    expect(result).toEqual({ transactionId: "tx-123" });
    expect(mockFetch).not.toHaveBeenCalled();
  });
});

describe("withGovernance — with config", () => {
  const config = { apiKey: "test-key", apiUrl: "https://test.agentgate.dev" };

  it("evaluates, executes, and confirms on success", async () => {
    // Mock evaluate response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        decision: "allow",
        authorization: { token: "jwt-token", tx_id: "agtx-123" },
        evaluation_id: "eval-123",
      }),
    });

    // Mock confirm response (fire and forget)
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

    const result = await withGovernance(
      config,
      mockRequest,
      async (auth: AuthorizationResult) => {
        expect(auth.decision).toBe("allow");
        expect(auth.token).toBe("jwt-token");
        expect(auth.txId).toBe("agtx-123");

        return {
          success: true,
          amount: 100,
          counterpartyId: "test",
          railReference: "pix-ref-456",
          output: { pix_id: "E123" },
        };
      },
    );

    expect(result).toEqual({ pix_id: "E123" });
    expect(mockFetch).toHaveBeenCalledTimes(2);

    // First call: evaluate
    expect(mockFetch.mock.calls[0][0]).toBe("https://test.agentgate.dev/api/v1/evaluate");

    // Second call: confirm
    expect(mockFetch.mock.calls[1][0]).toBe("https://test.agentgate.dev/api/v1/confirm");
  });

  it("throws GovernanceDenialError on deny", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        decision: "deny",
        reason: "Daily limit exceeded",
        evaluation_id: "eval-456",
      }),
    });

    await expect(
      withGovernance(config, mockRequest, async () => ({
        success: true, amount: 0, counterpartyId: "", railReference: "", output: null,
      })),
    ).rejects.toThrow(GovernanceDenialError);

    // Should only call evaluate, not execute or confirm
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("throws GovernanceEscalationError on escalate", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        decision: "escalate",
        evaluation_id: "eval-789",
        escalation_id: "esc-123",
      }),
    });

    await expect(
      withGovernance(config, mockRequest, async () => ({
        success: true, amount: 0, counterpartyId: "", railReference: "", output: null,
      })),
    ).rejects.toThrow(GovernanceEscalationError);

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("voids on execution failure", async () => {
    // Mock evaluate
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        decision: "allow",
        authorization: { token: "jwt", tx_id: "agtx-fail" },
        evaluation_id: "eval-fail",
      }),
    });

    // Mock void (fire and forget)
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

    await expect(
      withGovernance(config, mockRequest, async () => {
        throw new Error("PIX API timeout");
      }),
    ).rejects.toThrow("PIX API timeout");

    expect(mockFetch).toHaveBeenCalledTimes(2);
    // Second call should be void
    expect(mockFetch.mock.calls[1][0]).toBe("https://test.agentgate.dev/api/v1/confirm/agtx-fail/void");
  });

  it("voids on execution returning success: false", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        decision: "allow",
        authorization: { token: "jwt", tx_id: "agtx-soft-fail" },
        evaluation_id: "eval-sf",
      }),
    });

    // Mock void
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

    const result = await withGovernance(
      config,
      mockRequest,
      async () => ({
        success: false,
        amount: 0,
        counterpartyId: "test",
        railReference: "",
        output: { error: "insufficient_funds" },
        error: "Card declined",
      }),
    );

    expect(result).toEqual({ error: "insufficient_funds" });
    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch.mock.calls[1][0]).toContain("/void");
  });
});
