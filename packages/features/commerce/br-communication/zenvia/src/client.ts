export class ZenviaClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.zenvia.com/v2";
    this.apiKey = env.ZENVIA_API_TOKEN || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async send_message(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/channels/${params.channel}/messages`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Zenvia API error: ${res.status}`);
    return res.json();
  }

  async get_message(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/reports/${params.messageId}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Zenvia API error: ${res.status}`);
    return res.json();
  }
}
