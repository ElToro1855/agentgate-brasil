export class IBGEClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://servicodados.ibge.gov.br/api/v1";
    this.apiKey = env.API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      
    };
  }

  async list_states(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/localidades/estados`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`IBGE API error: ${res.status}`);
    return res.json();
  }

  async get_state(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/localidades/estados/${params.uf}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`IBGE API error: ${res.status}`);
    return res.json();
  }

  async list_municipalities(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/localidades/estados/${params.uf}/municipios`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`IBGE API error: ${res.status}`);
    return res.json();
  }

  async list_all_municipalities(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/localidades/municipios`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`IBGE API error: ${res.status}`);
    return res.json();
  }

  async get_municipality(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/localidades/municipios/${params.id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`IBGE API error: ${res.status}`);
    return res.json();
  }
}
