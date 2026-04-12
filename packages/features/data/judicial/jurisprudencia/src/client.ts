export class JurisprudenciaClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://jurisprudencia.stf.jus.br/api/search";
    this.apiKey = env.API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      
    };
  }

  async search_stf(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.query !== undefined) query.set("query", String(params.query));
    if (params.page !== undefined) query.set("page", String(params.page));
    const url = `${this.baseUrl}/stf?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Jurisprudencia API error: ${res.status}`);
    return res.json();
  }

  async search_stj(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.query !== undefined) query.set("query", String(params.query));
    const url = `${this.baseUrl}/stj?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Jurisprudencia API error: ${res.status}`);
    return res.json();
  }
}
