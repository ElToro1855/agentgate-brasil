export class ZAPIClient {
  private baseUrl: string;
  private instanceId: string;
  private token: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.z-api.io/instances";
    this.instanceId = env.ZAPI_INSTANCE_ID || "";
    this.token = env.ZAPI_TOKEN || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.token}`,
    };
  }

  private instancePath(): string {
    return `${this.baseUrl}/${this.instanceId}/token/${this.token}`;
  }

  async send_text(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.instancePath()}/send-text`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Z-API API error: ${res.status}`);
    return res.json();
  }

  async send_image(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.instancePath()}/send-image`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Z-API API error: ${res.status}`);
    return res.json();
  }

  async send_document(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.instancePath()}/send-document`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`Z-API API error: ${res.status}`);
    return res.json();
  }

  async get_contacts(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.instancePath()}/contacts`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Z-API API error: ${res.status}`);
    return res.json();
  }

  async check_number(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.instancePath()}/phone-exists/${params.phone}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`Z-API API error: ${res.status}`);
    return res.json();
  }
}
