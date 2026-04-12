import { defineTool } from "@agentgate/framework";
import { ToolDiscovery } from "@agentgate/discovery";
import { z } from "zod";

export function createPlanejarConsulta(discovery: ToolDiscovery) {
  return defineTool({
    name: "planejar_consulta",
    description: "Creates an execution plan for a complex query that may require multiple tools. Returns relevant tools and a suggested execution order.",
    descriptionPt: "Cria um plano de execução para uma consulta complexa que pode exigir múltiplas ferramentas. Retorna ferramentas relevantes e uma ordem sugerida de execução.",
    inputSchema: z.object({
      query: z.string().describe("Natural language description of what you want to accomplish"),
      max_tools: z.number().optional().default(20).describe("Maximum tools to consider"),
    }),
    discovery: {
      tags: ["meta", "plan", "execute", "multi-step"],
      keywords: ["planejar", "executar", "consulta complexa", "plan", "complex query"],
    },
    handler: async (input) => {
      const relevantTools = discovery.search(input.query, input.max_tools);

      return {
        query: input.query,
        relevant_tools: relevantTools.map((t) => ({
          name: t.name,
          description: t.description,
        })),
        total_candidates: relevantTools.length,
        note: "Review these tools and call executar_lote with the selected tool calls, or call tools individually in sequence.",
      };
    },
  });
}
