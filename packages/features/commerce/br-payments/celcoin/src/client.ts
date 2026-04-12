export class CelcoinClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.celcoin.com.br/v5";
    this.apiKey = env.CELCOIN_CLIENT_ID || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async create_pix_transfer(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/pix/v1/payment`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Celcoin API error: ${res.status}`);
    return res.json();
  }

  async pay_bill(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/transactions/billpayments`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Celcoin API error: ${res.status}`);
    return res.json();
  }

  async get_balance(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/merchant/balance`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Celcoin API error: ${res.status}`);
    return res.json();
  }
}
