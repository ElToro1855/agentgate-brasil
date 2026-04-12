export class AnalistaFiscalClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "";
    this.apiKey = env.API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      
    };
  }

  async calculate_simples(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/simples`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`AnalistaFiscal API error: ${res.status}`);
    return res.json();
  }

  async compare_regimes(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/compare`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`AnalistaFiscal API error: ${res.status}`);
    return res.json();
  }

  async generate_dre(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/dre`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`AnalistaFiscal API error: ${res.status}`);
    return res.json();
  }

  async lookup_cnae(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/cnae/${params.code}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`AnalistaFiscal API error: ${res.status}`);
    return res.json();
  }
}
