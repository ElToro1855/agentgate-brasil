export class RappiClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.rappi.com/v1";
    this.apiKey = env.RAPPI_API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async search_stores(params: Record<string, any> = {}): Promise<any> {
    const basePath = `${this.baseUrl}/stores`;
    const query = new URLSearchParams();
    if (params.lat !== undefined) query.set("lat", String(params.lat));
    if (params.lng !== undefined) query.set("lng", String(params.lng));
    if (params.query !== undefined) query.set("query", String(params.query));
    const url = `${basePath}?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Rappi API error: ${res.status}`);
    return res.json();
  }

  async get_store_menu(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/stores/${params.store_id}/menu`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Rappi API error: ${res.status}`);
    return res.json();
  }

  async place_order(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/orders`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Rappi API error: ${res.status}`);
    return res.json();
  }

  async track_order(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/orders/${params.order_id}/tracking`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Rappi API error: ${res.status}`);
    return res.json();
  }
}
