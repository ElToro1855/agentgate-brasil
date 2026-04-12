export class VTEXClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://{account}.vtexcommercestable.com.br/api";
    this.apiKey = env.VTEX_APP_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      "X-VTEX-API-AppKey": this.apiKey,
      "X-VTEX-API-AppToken": env.VTEX_APP_TOKEN || "",
    };
  }

  async list_orders(params: Record<string, any> = {}): Promise<any> {
    const basePath = `${this.baseUrl}/oms/pvt/orders`;
    const query = new URLSearchParams();
    if (params.page !== undefined) query.set("page", String(params.page));
    if (params.per_page !== undefined) query.set("per_page", String(params.per_page));
    const url = `${basePath}?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`VTEX API error: ${res.status}`);
    return res.json();
  }

  async get_order(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/oms/pvt/orders/${params.orderId}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`VTEX API error: ${res.status}`);
    return res.json();
  }

  async search_products(params: Record<string, any> = {}): Promise<any> {
    const basePath = `${this.baseUrl}/catalog_system/pub/products/search`;
    const query = new URLSearchParams();
    if (params.ft !== undefined) query.set("ft", String(params.ft));
    const url = `${basePath}?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`VTEX API error: ${res.status}`);
    return res.json();
  }
}
