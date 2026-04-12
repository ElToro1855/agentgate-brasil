export class PagarMeClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.pagar.me/core/v5";
    this.apiKey = env.PAGARME_API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Basic ${Buffer.from(this.apiKey).toString("base64")}`,
    };
  }

  async create_charge(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/charges`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`PagarMe API error: ${res.status}`);
    return res.json();
  }

  async get_charge(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/charges/${params.id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`PagarMe API error: ${res.status}`);
    return res.json();
  }

  async list_charges(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.page !== undefined) query.set("page", String(params.page));
    if (params.size !== undefined) query.set("size", String(params.size));
    const url = `${this.baseUrl}/charges?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`PagarMe API error: ${res.status}`);
    return res.json();
  }

  async create_recipient(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/recipients`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`PagarMe API error: ${res.status}`);
    return res.json();
  }
}
