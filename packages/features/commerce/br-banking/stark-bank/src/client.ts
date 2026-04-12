export class StarkBankClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.starkbank.com/v2";
    this.apiKey = env.STARK_BANK_API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async get_balance(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/balance`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`StarkBank API error: ${res.status}`);
    return res.json();
  }

  async create_transfer(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/transfer`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`StarkBank API error: ${res.status}`);
    return res.json();
  }

  async create_boleto(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/boleto`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`StarkBank API error: ${res.status}`);
    return res.json();
  }

  async list_transactions(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams();
    if (params.limit !== undefined) query.set("limit", String(params.limit));
    const url = `${this.baseUrl}/transaction?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`StarkBank API error: ${res.status}`);
    return res.json();
  }
}
