export class ComprasGovClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://compras.dados.gov.br/fornecedores/v1";
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  async search_suppliers(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.cnpj !== undefined) query.set("cnpj", String(params.cnpj));
    if (params.nome !== undefined) query.set("nome", String(params.nome));
    const url = `${this.baseUrl}/fornecedores.json?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`ComprasGov API error: ${res.status}`);
    return res.json();
  }

  async search_prices(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.co_material_servico !== undefined) query.set("co_material_servico", String(params.co_material_servico));
    const url = `${this.baseUrl}/precos_praticados.json?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`ComprasGov API error: ${res.status}`);
    return res.json();
  }

  async search_bids(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.uasg !== undefined) query.set("uasg", String(params.uasg));
    const url = `${this.baseUrl}/licitacoes.json?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`ComprasGov API error: ${res.status}`);
    return res.json();
  }
}
