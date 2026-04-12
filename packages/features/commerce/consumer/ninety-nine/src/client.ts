export class NinetyNineClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.99app.com/v1";
    this.apiKey = env.NINETY_NINE_API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async estimate_ride(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/rides/estimate`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`99 API error: ${res.status}`);
    return res.json();
  }

  async request_ride(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/rides`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`99 API error: ${res.status}`);
    return res.json();
  }

  async track_ride(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/rides/${params.ride_id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`99 API error: ${res.status}`);
    return res.json();
  }

  async cancel_ride(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/rides/${params.ride_id}/cancel`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`99 API error: ${res.status}`);
    return res.json();
  }
}
