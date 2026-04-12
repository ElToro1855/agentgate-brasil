export class CNESClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://apidadosabertos.saude.gov.br/cnes";
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  async search_facilities(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.codigo_cnes !== undefined) query.set("codigo_cnes", String(params.codigo_cnes));
    if (params.nome_fantasia !== undefined) query.set("nome_fantasia", String(params.nome_fantasia));
    if (params.codigo_uf !== undefined) query.set("codigo_uf", String(params.codigo_uf));
    const url = `${this.baseUrl}/estabelecimentos?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`CNES API error: ${res.status}`);
    return res.json();
  }

  async search_professionals(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.codigo_cnes !== undefined) query.set("codigo_cnes", String(params.codigo_cnes));
    const url = `${this.baseUrl}/profissionais?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`CNES API error: ${res.status}`);
    return res.json();
  }
}
