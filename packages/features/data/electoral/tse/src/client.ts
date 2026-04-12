export class TSEClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://divulgacandcontas.tse.jus.br/divulga/rest/v1";
    this.apiKey = env.API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      
    };
  }

  async list_elections(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/eleicao/buscar/${params.year}/1`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`TSE API error: ${res.status}`);
    return res.json();
  }

  async search_candidates(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/candidatura/listar/${params.year}/${params.election_id}/candidatos`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`TSE API error: ${res.status}`);
    return res.json();
  }

  async get_candidate(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/candidatura/buscar/${params.year}/${params.election_id}/candidato/${params.candidate_id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`TSE API error: ${res.status}`);
    return res.json();
  }
}
