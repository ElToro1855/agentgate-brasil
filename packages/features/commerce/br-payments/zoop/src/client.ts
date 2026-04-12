export class ZoopClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.zoop.ws/v1/marketplaces";
    this.apiKey = env.ZOOP_API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async create_pix_transaction(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/transactions`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Zoop API error: ${res.status}`);
    return res.json();
  }

  async create_card_transaction(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/transactions`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Zoop API error: ${res.status}`);
    return res.json();
  }

  async get_transaction(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/transactions/${params.id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Zoop API error: ${res.status}`);
    return res.json();
  }

  async refund_transaction(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/transactions/${params.id}/void`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Zoop API error: ${res.status}`);
    return res.json();
  }

  async list_sellers(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/sellers`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Zoop API error: ${res.status}`);
    return res.json();
  }
}
