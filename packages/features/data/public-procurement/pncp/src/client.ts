export class PNCPClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://pncp.gov.br/api/consulta/v1";
    this.apiKey = env.API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      
    };
  }

  async search_contracts(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.dataInicial !== undefined) query.set("dataInicial", String(params.dataInicial));
    if (params.dataFinal !== undefined) query.set("dataFinal", String(params.dataFinal));
    if (params.pagina !== undefined) query.set("pagina", String(params.pagina));
    const url = `${this.baseUrl}/contratacoes/publicacao?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`PNCP API error: ${res.status}`);
    return res.json();
  }

  async get_contract(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/contratacoes/${params.id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`PNCP API error: ${res.status}`);
    return res.json();
  }
}
