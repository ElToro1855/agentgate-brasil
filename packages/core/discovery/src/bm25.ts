/**
 * Simple BM25 text search implementation.
 * No external dependencies — implements the algorithm directly.
 */

interface Document {
  id: string;
  terms: string[];
}

export class BM25Index {
  private documents: Document[] = [];
  private avgDocLength = 0;
  private idf: Map<string, number> = new Map();
  private k1 = 1.5;
  private b = 0.75;

  addDocument(id: string, text: string): void {
    const terms = this.tokenize(text);
    this.documents.push({ id, terms });
  }

  build(): void {
    const n = this.documents.length;
    if (n === 0) return;

    this.avgDocLength = this.documents.reduce((sum, d) => sum + d.terms.length, 0) / n;

    // Calculate IDF for each term
    const df = new Map<string, number>();
    for (const doc of this.documents) {
      const seen = new Set<string>();
      for (const term of doc.terms) {
        if (!seen.has(term)) {
          df.set(term, (df.get(term) || 0) + 1);
          seen.add(term);
        }
      }
    }

    for (const [term, freq] of df) {
      this.idf.set(term, Math.log((n - freq + 0.5) / (freq + 0.5) + 1));
    }
  }

  search(query: string, limit = 10): Array<{ id: string; score: number }> {
    const queryTerms = this.tokenize(query);
    const scores: Array<{ id: string; score: number }> = [];

    for (const doc of this.documents) {
      let score = 0;
      const termFreqs = new Map<string, number>();
      for (const term of doc.terms) {
        termFreqs.set(term, (termFreqs.get(term) || 0) + 1);
      }

      for (const qTerm of queryTerms) {
        const tf = termFreqs.get(qTerm) || 0;
        const idf = this.idf.get(qTerm) || 0;
        if (tf === 0 || idf === 0) continue;

        const numerator = tf * (this.k1 + 1);
        const denominator = tf + this.k1 * (1 - this.b + this.b * (doc.terms.length / this.avgDocLength));
        score += idf * (numerator / denominator);
      }

      if (score > 0) {
        scores.push({ id: doc.id, score });
      }
    }

    return scores.sort((a, b) => b.score - a.score).slice(0, limit);
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^a-záàâãéèêíïóôõöúüçñ0-9\s_-]/g, " ")
      .split(/\s+/)
      .filter((t) => t.length > 1);
  }
}
