import type { Tool } from "@agentgate/framework";
import { BM25Index } from "./bm25.js";

export type DiscoveryMode = "bm25" | "exact" | "none";

/**
 * Tool discovery engine — indexes tool metadata for smart search.
 */
export class ToolDiscovery {
  private index: BM25Index;
  private toolMap: Map<string, Tool> = new Map();
  private mode: DiscoveryMode;

  constructor(tools: Tool[], mode: DiscoveryMode = "bm25") {
    this.mode = mode;
    this.index = new BM25Index();

    for (const tool of tools) {
      this.toolMap.set(tool.name, tool);

      const document = [
        tool.name.replace(/_/g, " "),
        tool.description,
        tool.descriptionPt ?? "",
        ...(tool.discovery?.tags ?? []),
        ...(tool.discovery?.keywords ?? []),
      ].join(" ");

      this.index.addDocument(tool.name, document);
    }

    this.index.build();
  }

  /**
   * Search for tools matching a natural language query.
   */
  search(query: string, limit = 10): Tool[] {
    if (this.mode === "none") {
      return Array.from(this.toolMap.values()).slice(0, limit);
    }

    if (this.mode === "exact") {
      const q = query.toLowerCase();
      return Array.from(this.toolMap.values())
        .filter((t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          (t.descriptionPt?.toLowerCase().includes(q) ?? false)
        )
        .slice(0, limit);
    }

    // BM25 mode
    const results = this.index.search(query, limit);
    return results
      .map(({ id }) => this.toolMap.get(id))
      .filter((t): t is Tool => t !== undefined);
  }

  /**
   * Get total indexed tool count.
   */
  get size(): number {
    return this.toolMap.size;
  }
}
