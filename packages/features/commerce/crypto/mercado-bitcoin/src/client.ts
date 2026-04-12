export class MercadoBitcoinClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.mercadobitcoin.net/api/v4";
    this.apiKey = env.MERCADO_BITCOIN_API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async get_ticker(params: Record<string, any> = {}): Promise<any> {
    const basePath = `${this.baseUrl}/tickers`;
    const query = new URLSearchParams();
    if (params.symbols !== undefined) query.set("symbols", String(params.symbols));
    const url = `${basePath}?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`MercadoBitcoin API error: ${res.status}`);
    return res.json();
  }

  async get_orderbook(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/${params.symbol}/orderbook`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`MercadoBitcoin API error: ${res.status}`);
    return res.json();
  }

  async list_balances(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/accounts/balances`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`MercadoBitcoin API error: ${res.status}`);
    return res.json();
  }
}
