export class CieloClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.cieloecommerce.cielo.com.br/1";
    this.apiKey = env.CIELO_MERCHANT_ID || "";
    this.headers = {
      "Content-Type": "application/json",
      "MerchantId": this.apiKey,
      "MerchantKey": env.CIELO_MERCHANT_KEY || "",
    };
  }

  async create_sale(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/sales`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Cielo API error: ${res.status}`);
    return res.json();
  }

  async get_sale(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/sales/${params.paymentId}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Cielo API error: ${res.status}`);
    return res.json();
  }

  async capture_sale(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/sales/${params.paymentId}/capture`;
    const res = await fetch(url, {
      method: "PUT",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Cielo API error: ${res.status}`);
    return res.json();
  }

  async void_sale(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/sales/${params.paymentId}/void`;
    const res = await fetch(url, {
      method: "PUT",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Cielo API error: ${res.status}`);
    return res.json();
  }
}
