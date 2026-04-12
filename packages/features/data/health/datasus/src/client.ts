export class DataSUSClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://elasticsearch-saps.saude.gov.br";
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  async search_hospitalizations(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.q !== undefined) query.set("q", String(params.q));
    const url = `${this.baseUrl}/desc-esus-notifica-estado-*/_search?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`DataSUS API error: ${res.status}`);
    return res.json();
  }

  async get_health_indicators(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.q !== undefined) query.set("q", String(params.q));
    const url = `${this.baseUrl}/desc-notificacoes-esusve-*/_search?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`DataSUS API error: ${res.status}`);
    return res.json();
  }
}
