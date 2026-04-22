import { DEFAULT_API_URL, SANDBOX_API_KEY } from "./constants.js";

/**
 * Thin HTTP client for the AgentGate MPP + PIX policy engine.
 *
 * Env resolution:
 *   AGENTGATE_API_URL — base URL (default: Vercel production)
 *   AGENTGATE_API_KEY — API key (default: public sandbox key)
 *
 * Unlike the Stripe or Google AP2 clients, this one does not talk to the
 * payment rail directly. It talks to OZAV's policy engine, which issues
 * mppx challenges and verifies them against Tempo RPC on our behalf.
 *
 * HTTP 402 handling: when the endpoint returns 402, the caller has two
 * options:
 *   1. Use the `mppx` client SDK so its global fetch override signs the
 *      credential on Tempo and retries automatically.
 *   2. Read the challenge from the 402 response, sign manually, and call
 *      `createPixPayoutWithCredential` with the signed credential.
 *
 * The MCP tool path uses option (1) by default when available.
 */
export class MppTempoClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = (env.AGENTGATE_API_URL || DEFAULT_API_URL).replace(
      /\/$/,
      "",
    );
    this.apiKey = env.AGENTGATE_API_KEY || SANDBOX_API_KEY;
  }

  /** True if the client is running against the public sandbox key. */
  get isSandbox(): boolean {
    return this.apiKey === SANDBOX_API_KEY;
  }

  /**
   * Initiate a PIX payout. Expected behavior:
   *   - First invocation (no credential): server returns 402 with mppx challenge
   *   - Client is expected to sign on Tempo and retry with the credential
   *
   * When the mppx client SDK is active (e.g. `globalThis.fetch` was patched
   * by `Mppx.create({ methods: [tempo(...)] })` on the client side), this
   * method transparently completes the 402 handshake.
   *
   * When called without mppx, a 402 surface as `status: 'payment_required'`
   * in the return so the agent can see the challenge details and retry.
   */
  async createPixPayout(params: {
    pix_key: string;
    amount_brl: number;
    beneficiary_name?: string;
    reference?: string;
    /**
     * Recipient KYB fields — required when the bridge runs in live mode
     * (AGENTGATE_PIX_MODE=live) because Lumx KYBs each bank account on
     * creation. Optional in sandbox/simulate mode.
     */
    recipient?: PixRecipient;
  }): Promise<CreatePixPayoutResponse> {
    const url = `${this.baseUrl}/api/v1/payout/pix`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pix_key: params.pix_key,
        amount_brl: params.amount_brl,
        beneficiary_name: params.beneficiary_name,
        reference: params.reference,
        recipient: params.recipient,
      }),
    });

    // Captured on every branch so the caller can quote it back in a support
    // ticket. The policy engine stamps this on every response via log.stamp().
    const requestId = res.headers.get("x-request-id") || undefined;

    if (res.status === 402) {
      const wwwAuth =
        res.headers.get("www-authenticate") ||
        res.headers.get("WWW-Authenticate");
      const body = (await res.json().catch(() => ({}))) as Record<
        string,
        unknown
      >;
      return {
        status: "payment_required",
        challengeId: (body.challenge_id as string) || extractId(wwwAuth),
        challengeHeader: wwwAuth || "",
        hint: "Sign the Tempo payment referenced in the WWW-Authenticate header and retry with `Authorization: Payment <credential>`. The `mppx` client SDK handles this automatically.",
        requestId,
      };
    }

    const data = (await res.json().catch(() => ({}))) as Record<
      string,
      unknown
    >;

    if (!res.ok) {
      return {
        status: "failed",
        error:
          (data.error as string) ||
          `HTTP ${res.status}: ${res.statusText}`,
        errorCode: (data.error_code as string) || "HTTP_ERROR",
        requestId,
      };
    }

    // Live mode: bridge returns "processing" while Lumx settles async.
    // The caller should poll via getChallengeStatus(challengeId).
    if (data.status === "processing") {
      return {
        status: "processing",
        pixTransactionId: (data.pix_transaction_id as string) || "",
        amountBrl: data.amount_brl as number,
        exchangeRate: data.exchange_rate as number,
        amountUsdcCharged: data.amount_usdc_charged as number,
        receipt: (data.receipt as string) || res.headers.get("payment-receipt") || "",
        pollUrl: (data.poll_url as string) || undefined,
        requestId,
      };
    }

    return {
      status: "completed",
      pixTransactionId: (data.pix_transaction_id as string) || "",
      amountBrl: data.amount_brl as number,
      exchangeRate: data.exchange_rate as number,
      amountUsdcCharged: data.amount_usdc_charged as number,
      receipt: (data.receipt as string) || res.headers.get("payment-receipt") || "",
      simulated: data.simulated === true,
      requestId,
    };
  }

  /** Poll a challenge ID for its current status (for escalations or async flows). */
  async getChallengeStatus(challengeId: string): Promise<Record<string, unknown>> {
    const url = `${this.baseUrl}/api/v1/challenges/${encodeURIComponent(challengeId)}`;
    const res = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${this.apiKey}` },
    });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    const requestId = res.headers.get("x-request-id");
    // Merge into the payload non-destructively so callers that ignore
    // requestId see the same shape as before.
    return requestId ? { ...data, requestId } : data;
  }
}

/**
 * Recipient KYB fields forwarded to the OZAV bridge's Lumx integration.
 * Required for live mode; ignored in sandbox/simulate mode.
 */
export interface PixRecipient {
  legal_name: string;
  tax_id: string;
  email: string;
  holder_type?: "INDIVIDUAL" | "BUSINESS";
  holder_relationship?:
    | "SELF"
    | "HOLDING_COMPANY"
    | "SUBSIDIARY_COMPANY"
    | "BRANCH_OFFICE"
    | "BUSINESS_PARTNER"
    | "SUPPLIER"
    | "CUSTOMER"
    | "CREDITOR"
    | "DEBTOR"
    | "FRANCHISEE"
    | "FRIEND"
    | "RELATIVE"
    | "EMPLOYEE";
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string; // ISO-2
  };
  birth_date?: string; // YYYY-MM-DD (INDIVIDUAL only)
  incorporation_date?: string; // YYYY-MM-DD (BUSINESS only)
}

/**
 * `requestId` is set on every variant to the value of the `X-Request-Id`
 * header returned by the policy engine. Surface it in error messages and
 * support tickets so OZAV can jump straight to the log line.
 */
export type CreatePixPayoutResponse =
  | {
      status: "completed";
      pixTransactionId: string;
      amountBrl: number;
      exchangeRate: number;
      amountUsdcCharged: number;
      receipt: string;
      /** True when the bridge was in AGENTGATE_PIX_MODE=simulate. */
      simulated: boolean;
      requestId?: string;
    }
  | {
      status: "processing";
      pixTransactionId: string;
      amountBrl: number;
      exchangeRate: number;
      amountUsdcCharged: number;
      receipt: string;
      /** URL to poll for final settlement status. */
      pollUrl?: string;
      requestId?: string;
    }
  | {
      status: "payment_required";
      challengeId: string;
      challengeHeader: string;
      hint: string;
      requestId?: string;
    }
  | {
      status: "failed";
      error: string;
      errorCode: string;
      requestId?: string;
    };

function extractId(wwwAuth: string | null): string {
  if (!wwwAuth) return "";
  const match = wwwAuth.match(/Payment\s+id="([^"]+)"/i);
  return match ? match[1] : "";
}
