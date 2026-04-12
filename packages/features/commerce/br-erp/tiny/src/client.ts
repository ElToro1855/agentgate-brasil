export class TinyClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.tiny.com.br/api2";
    this.apiKey = env.TINY_API_TOKEN || "";
    this.headers = {
      "Content-Type": "application/json",
      "token": this.apiKey,
    };
  }

  async search_products(params: Record<string, any> = {}): Promise<any> {
    const basePath = `${this.baseUrl}/produtos.pesquisa.php`;
    const query = new URLSearchParams();
    if (params.pesquisa !== undefined) query.set("pesquisa", String(params.pesquisa));
    if (params.formato !== undefined) query.set("formato", String(params.formato));
    const url = `${basePath}?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Tiny API error: ${res.status}`);
    return res.json();
  }

  async get_product(params: Record<string, any> = {}): Promise<any> {
    const basePath = `${this.baseUrl}/produto.obter.php`;
    const query = new URLSearchParams();
    if (params.id !== undefined) query.set("id", String(params.id));
    const url = `${basePath}?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Tiny API error: ${res.status}`);
    return res.json();
  }

  async list_orders(params: Record<string, any> = {}): Promise<any> {
    const basePath = `${this.baseUrl}/pedidos.pesquisa.php`;
    const query = new URLSearchParams();
    if (params.dataInicial !== undefined) query.set("dataInicial", String(params.dataInicial));
    const url = `${basePath}?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Tiny API error: ${res.status}`);
    return res.json();
  }
}
