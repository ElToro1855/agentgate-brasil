export class TCUClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://portal.tcu.gov.br/api";
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  async search_deliberations(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.query !== undefined) query.set("query", String(params.query));
    if (params.ano !== undefined) query.set("ano", String(params.ano));
    const url = `${this.baseUrl}/deliberacoes?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`TCU API error: ${res.status}`);
    return res.json();
  }

  async search_sanctioned(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.cpfCnpj !== undefined) query.set("cpfCnpj", String(params.cpfCnpj));
    if (params.nome !== undefined) query.set("nome", String(params.nome));
    const url = `${this.baseUrl}/inidoneos?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`TCU API error: ${res.status}`);
    return res.json();
  }
}
