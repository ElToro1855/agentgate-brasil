export class GoogleAP2Client {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://agentpayments.googleapis.com/v2";
    this.apiKey = env.GOOGLE_AP2_API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async ap2_create_mandate(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/mandates`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`GoogleAP2 API error: ${res.status}`);
    return res.json();
  }

  async ap2_execute_payment(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/mandates/${params.mandate_id}/payments`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`GoogleAP2 API error: ${res.status}`);
    return res.json();
  }

  async ap2_get_mandate(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/mandates/${params.mandate_id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`GoogleAP2 API error: ${res.status}`);
    return res.json();
  }

  async ap2_list_payments(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/mandates/${params.mandate_id}/payments`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`GoogleAP2 API error: ${res.status}`);
    return res.json();
  }
}
