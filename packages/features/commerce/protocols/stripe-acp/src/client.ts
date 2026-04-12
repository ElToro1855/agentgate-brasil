import { BASE_URL } from "./constants.js";

export class StripeAcpClient {
  private apiKey: string;

  constructor(env: Record<string, string | undefined>) {
    this.apiKey = env.STRIPE_SECRET_KEY || "";
    if (!this.apiKey) {
      throw new Error("STRIPE_SECRET_KEY environment variable is required");
    }
  }

  private async request(method: string, path: string, body?: Record<string, unknown>): Promise<any> {
    const url = `${BASE_URL}${path}`;
    const headers: Record<string, string> = {
      "Authorization": `Bearer ${this.apiKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const options: RequestInit = { method, headers };

    if (body) {
      // Stripe uses form-encoded bodies
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(body)) {
        if (value !== undefined && value !== null) {
          if (typeof value === "object") {
            for (const [subKey, subVal] of Object.entries(value)) {
              params.append(`${key}[${subKey}]`, String(subVal));
            }
          } else {
            params.append(key, String(value));
          }
        }
      }
      options.body = params.toString();
    }

    const res = await fetch(url, options);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Stripe API error: ${data.error?.message || res.statusText}`);
    }

    return data;
  }

  async createPaymentIntent(params: {
    amount: number;
    currency: string;
    description?: string;
    metadata?: Record<string, string>;
  }) {
    return this.request("POST", "/payment_intents", {
      amount: params.amount,
      currency: params.currency,
      description: params.description,
      metadata: params.metadata,
    });
  }

  async confirmPaymentIntent(id: string, paymentMethod?: string) {
    const body: Record<string, unknown> = {};
    if (paymentMethod) body.payment_method = paymentMethod;
    return this.request("POST", `/payment_intents/${id}/confirm`, body);
  }

  async getPaymentIntent(id: string) {
    return this.request("GET", `/payment_intents/${id}`);
  }

  async listPaymentIntents(params: { limit?: number; starting_after?: string }) {
    const query = new URLSearchParams();
    if (params.limit) query.set("limit", String(params.limit));
    if (params.starting_after) query.set("starting_after", params.starting_after);
    const qs = query.toString();
    return this.request("GET", `/payment_intents${qs ? `?${qs}` : ""}`);
  }
}
