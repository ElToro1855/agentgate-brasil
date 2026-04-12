export class iFoodClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://merchant-api.ifood.com.br";
    this.apiKey = env.IFOOD_CLIENT_ID || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async search_restaurants(params: Record<string, any> = {}): Promise<any> {
    const basePath = `${this.baseUrl}/v1/merchants`;
    const query = new URLSearchParams();
    if (params.latitude !== undefined) query.set("latitude", String(params.latitude));
    if (params.longitude !== undefined) query.set("longitude", String(params.longitude));
    if (params.query !== undefined) query.set("query", String(params.query));
    const url = `${basePath}?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`iFood API error: ${res.status}`);
    return res.json();
  }

  async get_restaurant(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/v1/merchants/${params.merchant_id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`iFood API error: ${res.status}`);
    return res.json();
  }

  async get_menu(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/v1/merchants/${params.merchant_id}/menu`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`iFood API error: ${res.status}`);
    return res.json();
  }

  async place_order(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/v1/orders`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`iFood API error: ${res.status}`);
    return res.json();
  }

  async track_order(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/v1/orders/${params.order_id}/tracking`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`iFood API error: ${res.status}`);
    return res.json();
  }

  async list_orders(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/v1/orders`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`iFood API error: ${res.status}`);
    return res.json();
  }
}
