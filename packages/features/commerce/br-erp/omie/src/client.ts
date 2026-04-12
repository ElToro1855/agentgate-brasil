export class OmieClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://app.omie.com.br/api/v1";
    this.apiKey = env.OMIE_APP_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      
    };
  }

  async list_customers(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/geral/clientes/`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Omie API error: ${res.status}`);
    return res.json();
  }

  async get_customer(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/geral/clientes/`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Omie API error: ${res.status}`);
    return res.json();
  }

  async list_products(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/geral/produtos/`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Omie API error: ${res.status}`);
    return res.json();
  }

  async list_invoices(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/servicos/nfse/`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Omie API error: ${res.status}`);
    return res.json();
  }
}
