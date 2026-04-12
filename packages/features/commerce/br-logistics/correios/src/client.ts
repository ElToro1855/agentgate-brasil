export class CorreiosClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.correios.com.br";
    this.apiKey = env.CORREIOS_TOKEN || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async track_package(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/srorastro/v1/objetos/${params.code}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Correios API error: ${res.status}`);
    return res.json();
  }

  async calculate_shipping(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/preco/v1/nacional`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Correios API error: ${res.status}`);
    return res.json();
  }
}
