export class ConsultorJuridicoClient {
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

  async analyze_case(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/analyze`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`ConsultorJuridico API error: ${res.status}`);
    return res.json();
  }

  async search_precedents(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/precedents`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`ConsultorJuridico API error: ${res.status}`);
    return res.json();
  }

  async calculate_deadlines(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/deadlines`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`ConsultorJuridico API error: ${res.status}`);
    return res.json();
  }
}
