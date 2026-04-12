export class AsaasClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.asaas.com/v3";
    this.apiKey = env.ASAAS_API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async create_payment(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/payments`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Asaas API error: ${res.status}`);
    return res.json();
  }

  async get_payment(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/payments/${params.id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Asaas API error: ${res.status}`);
    return res.json();
  }

  async list_payments(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.customer !== undefined) query.set("customer", String(params.customer));
    if (params.status !== undefined) query.set("status", String(params.status));
    const url = `${this.baseUrl}/payments?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Asaas API error: ${res.status}`);
    return res.json();
  }

  async create_customer(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/customers`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Asaas API error: ${res.status}`);
    return res.json();
  }

  async get_pix_qrcode(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/payments/${params.id}/pixQrCode`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Asaas API error: ${res.status}`);
    return res.json();
  }

  async create_subscription(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/subscriptions`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Asaas API error: ${res.status}`);
    return res.json();
  }
}
