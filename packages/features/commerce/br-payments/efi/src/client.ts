export class EFIClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://api-pix.gerencianet.com.br";
    this.apiKey = env.EFI_CLIENT_ID || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
    };
  }

  async create_pix_charge(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/v2/cob`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`EFI API error: ${res.status}`);
    return res.json();
  }

  async get_pix_charge(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/v2/cob/${params.txid}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`EFI API error: ${res.status}`);
    return res.json();
  }

  async create_pix_qrcode(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/v2/loc/${params.id}/qrcode`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`EFI API error: ${res.status}`);
    return res.json();
  }
}
