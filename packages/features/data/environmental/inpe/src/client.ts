export class INPEClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://queimadas.dgi.inpe.br/api";
    this.apiKey = env.API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      
    };
  }

  async get_active_fires(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.pais_id !== undefined) query.set("pais_id", String(params.pais_id));
    if (params.estado_id !== undefined) query.set("estado_id", String(params.estado_id));
    const url = `${this.baseUrl}/focos?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`INPE API error: ${res.status}`);
    return res.json();
  }

  async get_fire_count(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.estado_id !== undefined) query.set("estado_id", String(params.estado_id));
    const url = `${this.baseUrl}/focos/count?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`INPE API error: ${res.status}`);
    return res.json();
  }
}
