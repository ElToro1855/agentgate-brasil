export class IuguClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.iugu.com/v1";
    this.apiKey = env.IUGU_API_TOKEN || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Basic ${Buffer.from(this.apiKey).toString("base64")}`,
    };
  }

  async create_invoice(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/invoices`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Iugu API error: ${res.status}`);
    return res.json();
  }

  async get_invoice(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/invoices/${params.id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Iugu API error: ${res.status}`);
    return res.json();
  }

  async create_subscription(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/subscriptions`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Iugu API error: ${res.status}`);
    return res.json();
  }
}
