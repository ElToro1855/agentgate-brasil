export class VindiClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://app.vindi.com.br/api/v1";
    this.apiKey = env.VINDI_API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Basic ${Buffer.from(this.apiKey).toString("base64")}`,
    };
  }

  async create_bill(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/bills`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Vindi API error: ${res.status}`);
    return res.json();
  }

  async get_bill(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/bills/${params.id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Vindi API error: ${res.status}`);
    return res.json();
  }

  async create_subscription(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/subscriptions`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Vindi API error: ${res.status}`);
    return res.json();
  }

  async list_customers(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/customers`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Vindi API error: ${res.status}`);
    return res.json();
  }
}
