export class PortalTransparenciaClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.portaldatransparencia.gov.br/api-de-dados";
    this.apiKey = env.TRANSPARENCIA_API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      "chave-api-dados": this.apiKey,
    };
  }

  async search_contracts(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.dataInicial !== undefined) query.set("dataInicial", String(params.dataInicial));
    if (params.dataFinal !== undefined) query.set("dataFinal", String(params.dataFinal));
    if (params.pagina !== undefined) query.set("pagina", String(params.pagina));
    const url = `${this.baseUrl}/contratos?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`PortalTransparencia API error: ${res.status}`);
    return res.json();
  }

  async search_spending(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.mesAno !== undefined) query.set("mesAno", String(params.mesAno));
    if (params.pagina !== undefined) query.set("pagina", String(params.pagina));
    const url = `${this.baseUrl}/despesas/recursos-recebidos?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`PortalTransparencia API error: ${res.status}`);
    return res.json();
  }

  async search_server_salaries(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.nome !== undefined) query.set("nome", String(params.nome));
    if (params.cpf !== undefined) query.set("cpf", String(params.cpf));
    if (params.pagina !== undefined) query.set("pagina", String(params.pagina));
    const url = `${this.baseUrl}/servidores?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`PortalTransparencia API error: ${res.status}`);
    return res.json();
  }

  async search_grants(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.mesAno !== undefined) query.set("mesAno", String(params.mesAno));
    if (params.pagina !== undefined) query.set("pagina", String(params.pagina));
    const url = `${this.baseUrl}/beneficios-cidadao?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`PortalTransparencia API error: ${res.status}`);
    return res.json();
  }
}
