export class TakeBlipClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://http.msging.net";
    this.apiKey = env.TAKE_BLIP_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async send_message(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/messages`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`TakeBlip API error: ${res.status}`);
    return res.json();
  }

  async get_contacts(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/commands`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`TakeBlip API error: ${res.status}`);
    return res.json();
  }
}
