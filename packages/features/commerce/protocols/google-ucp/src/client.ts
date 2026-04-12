export class GoogleUCPClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://commerce.googleapis.com/v1";
    this.apiKey = env.GOOGLE_UCP_API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async ucp_search_products(params: Record<string, any> = {}): Promise<any> {
    const basePath = `${this.baseUrl}/products/search`;
    const query = new URLSearchParams();
    if (params.query !== undefined) query.set("query", String(params.query));
    if (params.max_results !== undefined) query.set("max_results", String(params.max_results));
    const url = `${basePath}?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`GoogleUCP API error: ${res.status}`);
    return res.json();
  }

  async ucp_get_product(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/products/${params.product_id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`GoogleUCP API error: ${res.status}`);
    return res.json();
  }

  async ucp_compare_prices(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/products/${params.product_id}/offers`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`GoogleUCP API error: ${res.status}`);
    return res.json();
  }

  async ucp_purchase(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/orders`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`GoogleUCP API error: ${res.status}`);
    return res.json();
  }

  async ucp_get_order(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/orders/${params.order_id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`GoogleUCP API error: ${res.status}`);
    return res.json();
  }
}
