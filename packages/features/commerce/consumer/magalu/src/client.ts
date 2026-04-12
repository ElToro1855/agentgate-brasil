export class MagaluClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.magazineluiza.com.br/v1";
    this.apiKey = env.MAGALU_API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async search_products(params: Record<string, any> = {}): Promise<any> {
    const basePath = `${this.baseUrl}/products/search`;
    const query = new URLSearchParams();
    if (params.q !== undefined) query.set("q", String(params.q));
    if (params.limit !== undefined) query.set("limit", String(params.limit));
    const url = `${basePath}?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Magalu API error: ${res.status}`);
    return res.json();
  }

  async get_product(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/products/${params.sku}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Magalu API error: ${res.status}`);
    return res.json();
  }

  async check_availability(params: Record<string, any> = {}): Promise<any> {
    const basePath = `${this.baseUrl}/products/${params.sku}/availability`;
    const query = new URLSearchParams();
    if (params.zipcode !== undefined) query.set("zipcode", String(params.zipcode));
    const url = `${basePath}?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Magalu API error: ${res.status}`);
    return res.json();
  }

  async list_categories(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/categories`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Magalu API error: ${res.status}`);
    return res.json();
  }
}
