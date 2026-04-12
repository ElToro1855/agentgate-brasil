export class BACENClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api.bcb.gov.br/dados/serie/bcdata.sgs";
    this.apiKey = env.API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      
    };
  }

  async get_series(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/${params.series_code}/dados`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`BACEN API error: ${res.status}`);
    return res.json();
  }

  async get_series_last(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/${params.series_code}/dados/ultimos/${params.count}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`BACEN API error: ${res.status}`);
    return res.json();
  }

  async get_selic(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/432/dados/ultimos/1`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`BACEN API error: ${res.status}`);
    return res.json();
  }

  async get_ipca(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/433/dados/ultimos/1`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`BACEN API error: ${res.status}`);
    return res.json();
  }

  async get_usd_brl(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/1/dados/ultimos/1`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`BACEN API error: ${res.status}`);
    return res.json();
  }

  async get_eur_brl(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/21619/dados/ultimos/1`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`BACEN API error: ${res.status}`);
    return res.json();
  }
}
