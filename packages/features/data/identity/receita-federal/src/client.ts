export class ReceitaFederalClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://receitaws.com.br/v1";
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  async get_cnpj_details(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/cnpj/${params.cnpj}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`ReceitaFederal API error: ${res.status}`);
    return res.json();
  }
}
