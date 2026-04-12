export class EBANXClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.ebanx.com/ws";
    this.apiKey = env.EBANX_INTEGRATION_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      "integration_key": this.apiKey,
    };
  }

  async create_payment(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/direct`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`EBANX API error: ${res.status}`);
    return res.json();
  }

  async get_payment(params: Record<string, any> = {}): Promise<any> {
    const basePath = `${this.baseUrl}/query`;
    const query = new URLSearchParams();
    if (params.hash !== undefined) query.set("hash", String(params.hash));
    const url = `${basePath}?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`EBANX API error: ${res.status}`);
    return res.json();
  }
}
