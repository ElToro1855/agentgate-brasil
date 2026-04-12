export class FocusNFeClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.focusnfe.com.br/v2";
    this.apiKey = env.FOCUS_NFE_TOKEN || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Basic ${Buffer.from(this.apiKey).toString("base64")}`,
    };
  }

  async create_nfe(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/nfe`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`FocusNFe API error: ${res.status}`);
    return res.json();
  }

  async get_nfe(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/nfe/${params.ref}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`FocusNFe API error: ${res.status}`);
    return res.json();
  }
}
