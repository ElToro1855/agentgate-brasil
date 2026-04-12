export class StoneClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.openbank.stone.com.br/api/v1";
    this.apiKey = env.STONE_API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async get_balance(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/accounts/${params.account_id}/balance`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Stone API error: ${res.status}`);
    return res.json();
  }

  async create_pix_payment(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/pix/outbound_pix_payments`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Stone API error: ${res.status}`);
    return res.json();
  }

  async list_pix_payments(params: Record<string, any> = {}): Promise<any> {
    const basePath = `${this.baseUrl}/pix/outbound_pix_payments`;
    const query = new URLSearchParams();
    if (params.account_id !== undefined) query.set("account_id", String(params.account_id));
    const url = `${basePath}?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Stone API error: ${res.status}`);
    return res.json();
  }

  async get_pix_payment(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/pix/outbound_pix_payments/${params.id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Stone API error: ${res.status}`);
    return res.json();
  }
}
