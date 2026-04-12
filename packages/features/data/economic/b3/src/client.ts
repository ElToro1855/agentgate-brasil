export class B3Client {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.b3.com.br";
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  async get_quote(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/market/quotes/${params.ticker}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`B3 API error: ${res.status}`);
    return res.json();
  }

  async get_ibovespa(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/market/indices/IBOV`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`B3 API error: ${res.status}`);
    return res.json();
  }
}
