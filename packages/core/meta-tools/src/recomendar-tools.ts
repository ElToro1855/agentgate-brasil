import { defineTool } from "@agentgate/framework";
import { ToolDiscovery } from "@agentgate/discovery";
import { z } from "zod";

export function createRecomendarTools(discovery: ToolDiscovery) {
  return defineTool({
    name: "recomendar_tools",
    description: "Search for relevant tools using natural language. Returns the most relevant tools for your query.",
    descriptionPt: "Busca ferramentas relevantes usando linguagem natural. Retorna as ferramentas mais relevantes para sua consulta.",
    inputSchema: z.object({
      query: z.string().describe("Natural language description of what you want to do"),
      limit: z.number().optional().default(10).describe("Maximum results to return"),
    }),
    discovery: {
      tags: ["meta", "search", "recommend", "discovery"],
      keywords: ["buscar", "encontrar", "recomendar", "search", "find"],
    },
    handler: async (input) => {
      const tools = discovery.search(input.query, input.limit);

      return {
        query: input.query,
        results: tools.map((t) => ({
          name: t.name,
          description: t.description,
          descriptionPt: t.descriptionPt,
          tags: t.discovery?.tags ?? [],
        })),
        total: tools.length,
      };
    },
  });
}
