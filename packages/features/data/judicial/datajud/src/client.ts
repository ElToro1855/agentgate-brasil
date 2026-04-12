export class DataJudClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "https://datajud-wiki.cnj.jus.br/api";
    this.apiKey = env.DATAJUD_API_KEY || "";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": this.apiKey,
    };
  }

  async search_processes(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/pesquisa-publica`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`DataJud API error: ${res.status}`);
    return res.json();
  }

  async get_process(params: Record<string, any> = {}): Promise<any> {
    const url = `${this.baseUrl}/processos/${params.npu}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) throw new Error(`DataJud API error: ${res.status}`);
    return res.json();
  }
}
