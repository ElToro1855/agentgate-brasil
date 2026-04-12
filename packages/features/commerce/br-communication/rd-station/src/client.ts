export class RDStationClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.rd.services";
    this.apiKey = env.RD_STATION_TOKEN || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async create_contact(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/platform/contacts`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`RDStation API error: ${res.status}`);
    return res.json();
  }

  async create_event(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/platform/events`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`RDStation API error: ${res.status}`);
    return res.json();
  }
}
