export class MelhorEnvioClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://melhorenvio.com.br/api/v2/me";
    this.apiKey = env.MELHOR_ENVIO_TOKEN || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async calculate_shipping(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/shipment/calculate`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`MelhorEnvio API error: ${res.status}`);
    return res.json();
  }

  async create_shipment(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/cart`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`MelhorEnvio API error: ${res.status}`);
    return res.json();
  }

  async track_shipment(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.orders !== undefined) query.set("orders", String(params.orders));
    const url = `${this.baseUrl}/shipment/tracking?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`MelhorEnvio API error: ${res.status}`);
    return res.json();
  }

  async generate_label(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/shipment/generate`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`MelhorEnvio API error: ${res.status}`);
    return res.json();
  }

  async list_shipments(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/orders`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`MelhorEnvio API error: ${res.status}`);
    return res.json();
  }
}
