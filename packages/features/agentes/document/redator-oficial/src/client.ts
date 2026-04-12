export class RedatorOficialClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "";
    this.apiKey = env.API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      
    };
  }

  async draft_oficio(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/draft`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`RedatorOficial API error: ${res.status}`);
    return res.json();
  }

  async format_document(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/format`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`RedatorOficial API error: ${res.status}`);
    return res.json();
  }

  async validate_document(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/validate`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`RedatorOficial API error: ${res.status}`);
    return res.json();
  }
}
