export class SERPROClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://gateway.apiserpro.serpro.gov.br";
    this.apiKey = env.SERPRO_API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async validate_cpf(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/consulta-cpf-df/v1/cpf/${params.cpf}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`SERPRO API error: ${res.status}`);
    return res.json();
  }

  async get_cnpj(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/consulta-cnpj-df/v1/cnpj/${params.cnpj}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`SERPRO API error: ${res.status}`);
    return res.json();
  }
}
