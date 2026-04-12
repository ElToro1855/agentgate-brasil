export class SenadoFederalClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://legis.senado.leg.br/dadosabertos";
    this.apiKey = env.API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      
    };
  }

  async list_senators(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/senador/lista/atual`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Senado Federal API error: ${res.status}`);
    return res.json();
  }

  async get_senator(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/senador/${params.code}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Senado Federal API error: ${res.status}`);
    return res.json();
  }

  async list_matters(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.sigla !== undefined) query.set("sigla", String(params.sigla));
    if (params.ano !== undefined) query.set("ano", String(params.ano));
    const url = `${this.baseUrl}/materia/pesquisa/lista?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Senado Federal API error: ${res.status}`);
    return res.json();
  }

  async get_matter(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/materia/${params.code}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Senado Federal API error: ${res.status}`);
    return res.json();
  }

  async list_votes(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/plenario/lista/votacao/${params.year}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Senado Federal API error: ${res.status}`);
    return res.json();
  }
}
