export class BrasilAPIClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://brasilapi.com.br/api";
    this.apiKey = env.API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      
    };
  }

  async get_cep(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/cep/v2/${params.cep}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`BrasilAPI API error: ${res.status}`);
    return res.json();
  }

  async get_cnpj(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/cnpj/v1/${params.cnpj}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`BrasilAPI API error: ${res.status}`);
    return res.json();
  }

  async list_banks(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/banks/v1`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`BrasilAPI API error: ${res.status}`);
    return res.json();
  }

  async get_bank(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/banks/v1/${params.code}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`BrasilAPI API error: ${res.status}`);
    return res.json();
  }

  async list_holidays(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/feriados/v1/${params.year}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`BrasilAPI API error: ${res.status}`);
    return res.json();
  }

  async get_ddd(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/ddd/v1/${params.ddd}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`BrasilAPI API error: ${res.status}`);
    return res.json();
  }

  async get_fipe(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/fipe/preco/v1/${params.fipe_code}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`BrasilAPI API error: ${res.status}`);
    return res.json();
  }

  async list_fipe_brands(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/fipe/marcas/v1/${params.vehicle_type}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`BrasilAPI API error: ${res.status}`);
    return res.json();
  }
}
