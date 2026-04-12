export class OpenFinanceClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.openfinancebrasil.org.br";
    this.apiKey = env.OPEN_FINANCE_TOKEN || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async list_accounts(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/accounts/v2/accounts`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`OpenFinance API error: ${res.status}`);
    return res.json();
  }

  async get_balance(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/accounts/v2/accounts/${params.accountId}/balances`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`OpenFinance API error: ${res.status}`);
    return res.json();
  }

  async list_transactions(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/accounts/v2/accounts/${params.accountId}/transactions`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`OpenFinance API error: ${res.status}`);
    return res.json();
  }
}
