export class DiarioOficialClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://queridodiario.ok.org.br/api";
    this.apiKey = env.API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      
    };
  }

  async search_gazettes(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.querystring !== undefined) query.set("querystring", String(params.querystring));
    if (params.territory_id !== undefined) query.set("territory_id", String(params.territory_id));
    if (params.since !== undefined) query.set("since", String(params.since));
    if (params.until !== undefined) query.set("until", String(params.until));
    const url = `${this.baseUrl}/gazettes?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`DiarioOficial API error: ${res.status}`);
    return res.json();
  }
}
