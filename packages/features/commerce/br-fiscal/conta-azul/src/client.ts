export class ContaAzulClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.contaazul.com/v1";
    this.apiKey = env.CONTA_AZUL_TOKEN || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async list_customers(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/customers`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`ContaAzul API error: ${res.status}`);
    return res.json();
  }

  async create_sale(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/sales`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`ContaAzul API error: ${res.status}`);
    return res.json();
  }

  async list_products(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/products`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`ContaAzul API error: ${res.status}`);
    return res.json();
  }
}
