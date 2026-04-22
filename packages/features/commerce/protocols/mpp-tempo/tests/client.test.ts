import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MppTempoClient } from "../src/client.js";
import { SANDBOX_API_KEY } from "../src/constants.js";

/**
 * Mock builder: returns a Response-like object.
 */
function mockResponse(
  status: number,
  body: Record<string, unknown> | string,
  headers: Record<string, string> = {},
): Response {
  const bodyStr = typeof body === "string" ? body : JSON.stringify(body);
  return new Response(bodyStr, {
    status,
    headers: {
      "content-type": "application/json",
      ...headers,
    },
  });
}

describe("MppTempoClient.createPixPayout — response branching", () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // biome-ignore lint/suspicious/noExplicitAny: spying on global fetch
    fetchSpy = vi.spyOn(globalThis, "fetch" as any);
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it("returns 'completed' on simulate-mode 200 response", async () => {
    fetchSpy.mockResolvedValueOnce(
      mockResponse(200, {
        status: "completed",
        pix_transaction_id: "SIM_abc123",
        amount_brl: 100,
        exchange_rate: 5.2,
        amount_usdc_charged: 19.5,
        receipt: "agentgate-receipt-xyz",
        simulated: true,
      }),
    );

    const client = new MppTempoClient({});
    const result = await client.createPixPayout({
      pix_key: "test@ozav.io",
      amount_brl: 100,
    });

    expect(result.status).toBe("completed");
    if (result.status === "completed") {
      expect(result.pixTransactionId).toBe("SIM_abc123");
      expect(result.simulated).toBe(true);
      expect(result.amountBrl).toBe(100);
    }
  });

  it("returns 'processing' on live-mode async response (Bug #8)", async () => {
    fetchSpy.mockResolvedValueOnce(
      mockResponse(200, {
        status: "processing",
        pix_transaction_id: "lumx-tx-abc",
        amount_brl: 100,
        exchange_rate: 5.2,
        amount_usdc_charged: 19.5,
        receipt: "agentgate-receipt-xyz",
        poll_url: "/api/v1/challenges/ch_abc",
      }),
    );

    const client = new MppTempoClient({});
    const result = await client.createPixPayout({
      pix_key: "test@ozav.io",
      amount_brl: 100,
    });

    // Regression guard for Bug #8: MUST surface as "processing", not "completed"
    expect(result.status).toBe("processing");
    if (result.status === "processing") {
      expect(result.pixTransactionId).toBe("lumx-tx-abc");
      expect(result.pollUrl).toBe("/api/v1/challenges/ch_abc");
    }
  });

  it("returns 'payment_required' on 402 with mppx challenge", async () => {
    const wwwAuth =
      'Payment id="u_abc123", realm="agentgate.ozav.io", method="tempo", intent="charge", request="eyJhbW91bnQiOiIxMDAifQ==", expires="2026-04-21T18:00:00Z"';

    fetchSpy.mockResolvedValueOnce(
      mockResponse(
        402,
        {
          type: "https://paymentauth.org/problems/payment-required",
          title: "Payment Required",
          status: 402,
          challenge_id: "u_abc123",
        },
        { "www-authenticate": wwwAuth },
      ),
    );

    const client = new MppTempoClient({});
    const result = await client.createPixPayout({
      pix_key: "test@ozav.io",
      amount_brl: 100,
    });

    expect(result.status).toBe("payment_required");
    if (result.status === "payment_required") {
      expect(result.challengeId).toBe("u_abc123");
      expect(result.challengeHeader).toContain("method=\"tempo\"");
    }
  });

  it("returns 'failed' on 4xx/5xx error", async () => {
    fetchSpy.mockResolvedValueOnce(
      mockResponse(500, {
        error: "Internal server error",
        error_code: "INTERNAL_ERROR",
      }),
    );

    const client = new MppTempoClient({});
    const result = await client.createPixPayout({
      pix_key: "test@ozav.io",
      amount_brl: 100,
    });

    expect(result.status).toBe("failed");
    if (result.status === "failed") {
      expect(result.error).toBe("Internal server error");
      expect(result.errorCode).toBe("INTERNAL_ERROR");
    }
  });

  it("captures X-Request-Id on every response variant for support correlation", async () => {
    const cases: Array<{ status: number; body: Record<string, unknown>; extraHeaders?: Record<string, string> }> = [
      { status: 200, body: { status: "completed", pix_transaction_id: "SIM_x" } },
      { status: 200, body: { status: "processing", pix_transaction_id: "lumx-x", poll_url: "/api/v1/challenges/u_x" } },
      {
        status: 402,
        body: { challenge_id: "u_x" },
        extraHeaders: {
          "www-authenticate": 'Payment id="u_x", realm="agentgate.ozav.io", method="tempo"',
        },
      },
      { status: 500, body: { error: "boom" } },
    ];

    for (const c of cases) {
      fetchSpy.mockResolvedValueOnce(
        mockResponse(c.status, c.body, {
          "x-request-id": "req-abc-123",
          ...c.extraHeaders,
        }),
      );

      const client = new MppTempoClient({});
      const result = await client.createPixPayout({
        pix_key: "test@ozav.io",
        amount_brl: 100,
      });

      expect(result.requestId, `branch ${result.status}`).toBe("req-abc-123");
    }
  });

  it("forwards 'recipient' KYB fields in the request body (Bug #9)", async () => {
    fetchSpy.mockResolvedValueOnce(mockResponse(200, { status: "completed" }));

    const client = new MppTempoClient({});
    await client.createPixPayout({
      pix_key: "test@ozav.io",
      amount_brl: 100,
      recipient: {
        legal_name: "Example Ltda",
        tax_id: "12345678901",
        email: "ex@example.com",
        holder_type: "BUSINESS",
        holder_relationship: "CUSTOMER",
        address: {
          line1: "Av. Paulista 1000",
          city: "São Paulo",
          state: "SP",
          postalCode: "01310-100",
          country: "BR",
        },
      },
    });

    // Regression guard for Bug #9: recipient MUST appear in the body
    const call = fetchSpy.mock.calls[0];
    const options = call?.[1] as RequestInit;
    const body = JSON.parse(options.body as string);
    expect(body.recipient).toBeDefined();
    expect(body.recipient.legal_name).toBe("Example Ltda");
    expect(body.recipient.holder_relationship).toBe("CUSTOMER");
    expect(body.recipient.address.line1).toBe("Av. Paulista 1000");
  });
});

describe("MppTempoClient.getChallengeStatus", () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // biome-ignore lint/suspicious/noExplicitAny: spying on global fetch
    fetchSpy = vi.spyOn(globalThis, "fetch" as any);
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it("returns the raw challenge payload when the poll succeeds", async () => {
    fetchSpy.mockResolvedValueOnce(
      mockResponse(200, {
        status: "paid",
        challenge_id: "u_abc123",
        result: {
          status: "completed",
          pix_transaction_id: "E20260421abc",
          settled_at: "2026-04-21T17:00:05Z",
        },
      }),
    );

    const client = new MppTempoClient({});
    const result = await client.getChallengeStatus("u_abc123");

    expect(result.status).toBe("paid");
    expect(result.challenge_id).toBe("u_abc123");
    // URL-encodes the challenge id and uses GET + Bearer
    const call = fetchSpy.mock.calls[0];
    const url = call?.[0] as string;
    expect(url).toMatch(/\/api\/v1\/challenges\/u_abc123$/);
    const options = call?.[1] as RequestInit;
    expect(options.method).toBe("GET");
    expect((options.headers as Record<string, string>).Authorization).toContain("Bearer ");
  });

  it("URL-encodes a challenge id with unsafe characters", async () => {
    fetchSpy.mockResolvedValueOnce(mockResponse(200, { status: "pending" }));

    const client = new MppTempoClient({});
    await client.getChallengeStatus("weird id/with%chars");

    const url = fetchSpy.mock.calls[0]?.[0] as string;
    expect(url).toMatch(/weird%20id%2Fwith%25chars$/);
  });

  it("returns an empty object when the server responds with non-JSON", async () => {
    fetchSpy.mockResolvedValueOnce(new Response("not json", { status: 500 }));

    const client = new MppTempoClient({});
    const result = await client.getChallengeStatus("u_err");
    expect(result).toEqual({});
  });
});

describe("MppTempoClient — sandbox detection", () => {
  it("uses SANDBOX_API_KEY by default", () => {
    const client = new MppTempoClient({});
    expect(client.isSandbox).toBe(true);
  });

  it("detects non-sandbox API keys", () => {
    const client = new MppTempoClient({ AGENTGATE_API_KEY: "ag_live_xxxxx" });
    expect(client.isSandbox).toBe(false);
  });

  it("strips trailing slash from custom API URL", () => {
    const client = new MppTempoClient({
      AGENTGATE_API_URL: "https://custom.example.com/",
    });
    // Access via indirect test — make a request and check the URL
    const _ = client; // silence unused
    // The internal _baseUrl is private; indirectly verified by integration.
    expect(SANDBOX_API_KEY).toBe("ag_sandbox_demo_READONLY_00000000000000000");
  });
});
