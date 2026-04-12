export class CmaradosDeputadosClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://dadosabertos.camara.leg.br/api/v2";
    this.apiKey = env.API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      
    };
  }

  async list_deputies(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.nome !== undefined) query.set("nome", String(params.nome));
    if (params.siglaPartido !== undefined) query.set("siglaPartido", String(params.siglaPartido));
    if (params.siglaUf !== undefined) query.set("siglaUf", String(params.siglaUf));
    const url = `${this.baseUrl}/deputados?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Câmara dos Deputados API error: ${res.status}`);
    return res.json();
  }

  async get_deputy(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/deputados/${params.id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Câmara dos Deputados API error: ${res.status}`);
    return res.json();
  }

  async get_deputy_expenses(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/deputados/${params.id}/despesas`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Câmara dos Deputados API error: ${res.status}`);
    return res.json();
  }

  async list_proposals(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.siglaTipo !== undefined) query.set("siglaTipo", String(params.siglaTipo));
    if (params.ano !== undefined) query.set("ano", String(params.ano));
    const url = `${this.baseUrl}/proposicoes?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Câmara dos Deputados API error: ${res.status}`);
    return res.json();
  }

  async get_proposal(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/proposicoes/${params.id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Câmara dos Deputados API error: ${res.status}`);
    return res.json();
  }
}
