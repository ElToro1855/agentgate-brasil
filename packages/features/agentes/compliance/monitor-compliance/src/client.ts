export class MonitorComplianceClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "";
    this.apiKey = env.API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      
    };
  }

  async check_entity(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/check`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`MonitorCompliance API error: ${res.status}`);
    return res.json();
  }

  async generate_report(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/report`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`MonitorCompliance API error: ${res.status}`);
    return res.json();
  }

  async list_alerts(params: Record<string, any> = {}): Promise<any> {
    const basePath = `${this.baseUrl}/alerts`;
    const query = new URLSearchParams();
    if (params.severity !== undefined) query.set("severity", String(params.severity));
    const url = `${basePath}?${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`MonitorCompliance API error: ${res.status}`);
    return res.json();
  }
}
