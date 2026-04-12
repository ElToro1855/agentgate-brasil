export class EvolutionAPIClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.evolution.com.br";
    this.apiKey = env.EVOLUTION_API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async send_text(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/message/sendText/${params.instance}`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`EvolutionAPI API error: ${res.status}`);
    return res.json();
  }

  async send_media(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/message/sendMedia/${params.instance}`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`EvolutionAPI API error: ${res.status}`);
    return res.json();
  }
}
