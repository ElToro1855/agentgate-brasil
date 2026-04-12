export class PagSeguroClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.pagseguro.com";
    this.apiKey = env.PAGSEGURO_TOKEN || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async create_charge(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/charges`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`PagSeguro API error: ${res.status}`);
    return res.json();
  }

  async get_charge(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/charges/${params.id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`PagSeguro API error: ${res.status}`);
    return res.json();
  }

  async list_charges(params: Record<string, any> = {}): Promise<any> {
    const basePath = `${this.baseUrl}/charges`;
    const query = new URLSearchParams();
    if (params.status !== undefined) query.set("status", String(params.status));
    const url = `${basePath}?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`PagSeguro API error: ${res.status}`);
    return res.json();
  }
}
