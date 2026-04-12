export class ANAClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://www.snirh.gov.br/hidroweb/rest/api";
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  async list_stations(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.uf !== undefined) query.set("uf", String(params.uf));
    const url = `${this.baseUrl}/estacao/lista?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`ANA API error: ${res.status}`);
    return res.json();
  }

  async get_station_data(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/estacao/${params.code}/dados`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`ANA API error: ${res.status}`);
    return res.json();
  }
}
