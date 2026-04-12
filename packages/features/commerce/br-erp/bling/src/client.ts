export class BlingClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://www.bling.com.br/Api/v3";
    this.apiKey = env.BLING_API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async list_products(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/produtos`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Bling API error: ${res.status}`);
    return res.json();
  }

  async get_product(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/produtos/${params.id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Bling API error: ${res.status}`);
    return res.json();
  }

  async list_orders(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/pedidos/vendas`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Bling API error: ${res.status}`);
    return res.json();
  }

  async create_order(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/pedidos/vendas`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Bling API error: ${res.status}`);
    return res.json();
  }
}
