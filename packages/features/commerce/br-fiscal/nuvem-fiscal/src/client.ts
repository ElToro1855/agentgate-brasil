export class NuvemFiscalClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.nuvemfiscal.com.br";
    this.apiKey = env.NUVEM_FISCAL_API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async create_nfe(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/nfe`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`NuvemFiscal API error: ${res.status}`);
    return res.json();
  }

  async get_nfe(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/nfe/${params.id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`NuvemFiscal API error: ${res.status}`);
    return res.json();
  }

  async cancel_nfe(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/nfe/${params.id}/cancelamento`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`NuvemFiscal API error: ${res.status}`);
    return res.json();
  }

  async get_nfe_pdf(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/nfe/${params.id}/pdf`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`NuvemFiscal API error: ${res.status}`);
    return res.json();
  }
}
