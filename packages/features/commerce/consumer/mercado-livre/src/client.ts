export class MercadoLivreClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.mercadolibre.com";
    this.apiKey = env.MERCADO_LIVRE_ACCESS_TOKEN || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async search_products(params: Record<string, any> = {}): Promise<any> {
    const basePath = `${this.baseUrl}/sites/MLB/search`;
    const query = new URLSearchParams();
    if (params.q !== undefined) query.set("q", String(params.q));
    if (params.limit !== undefined) query.set("limit", String(params.limit));
    if (params.category !== undefined) query.set("category", String(params.category));
    const url = `${basePath}?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`MercadoLivre API error: ${res.status}`);
    return res.json();
  }

  async get_product(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/items/${params.item_id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`MercadoLivre API error: ${res.status}`);
    return res.json();
  }

  async get_product_description(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/items/${params.item_id}/description`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`MercadoLivre API error: ${res.status}`);
    return res.json();
  }

  async list_categories(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/sites/MLB/categories`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`MercadoLivre API error: ${res.status}`);
    return res.json();
  }

  async get_seller(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/users/${params.seller_id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`MercadoLivre API error: ${res.status}`);
    return res.json();
  }

  async create_purchase(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/orders`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`MercadoLivre API error: ${res.status}`);
    return res.json();
  }

  async list_purchases(params: Record<string, any> = {}): Promise<any> {
    const basePath = `${this.baseUrl}/orders/search`;
    const query = new URLSearchParams();
    if (params.buyer !== undefined) query.set("buyer", String(params.buyer));
    const url = `${basePath}?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`MercadoLivre API error: ${res.status}`);
    return res.json();
  }
}
