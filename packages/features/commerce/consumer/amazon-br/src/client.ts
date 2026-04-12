export class AmazonBRClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://webservices.amazon.com.br/paapi5";
    this.apiKey = env.AMAZON_ACCESS_KEY || "";
    // NOTE: Amazon PAAPI5 uses AWS Signature V4 — add signing logic before production use
    this.headers = {
      "Content-Type": "application/json",
      "X-Amz-Access-Key": this.apiKey,
    };
  }

  async search_items(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/searchitems`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`AmazonBR API error: ${res.status}`);
    return res.json();
  }

  async get_item(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/getitems`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`AmazonBR API error: ${res.status}`);
    return res.json();
  }

  async get_browse_nodes(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/getbrowsenodes`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`AmazonBR API error: ${res.status}`);
    return res.json();
  }
}
