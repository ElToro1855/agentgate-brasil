import { defineTool, type FeatureRegistry, type ToolContext } from "@agentgate/framework";
import { z } from "zod";

export function createExecutarLote(registry: FeatureRegistry) {
  return defineTool({
    name: "executar_lote",
    description: "Execute multiple tool calls in parallel. Returns results for each call.",
    descriptionPt: "Executa múltiplas chamadas de ferramentas em paralelo. Retorna resultados para cada chamada.",
    inputSchema: z.object({
      calls: z.array(z.object({
        tool: z.string().describe("Tool name"),
        arguments: z.record(z.unknown()).describe("Tool arguments"),
      })).describe("Array of tool calls to execute"),
    }),
    discovery: {
      tags: ["meta", "batch", "parallel", "execute"],
      keywords: ["executar", "lote", "paralelo", "batch", "multiple"],
    },
    handler: async (input, context) => {
      const allTools = registry.getAllTools();
      const toolMap = new Map(allTools.map((t) => [t.name, t]));

      const results = await Promise.allSettled(
        input.calls.map(async (call) => {
          const tool = toolMap.get(call.tool);
          if (!tool) {
            throw new Error(`Tool not found: ${call.tool}`);
          }
          const parsed = tool.inputSchema.parse(call.arguments);
          return { tool: call.tool, result: await tool.handler(parsed, context) };
        })
      );

      return {
        total: input.calls.length,
        succeeded: results.filter((r) => r.status === "fulfilled").length,
        failed: results.filter((r) => r.status === "rejected").length,
        results: results.map((r, i) => ({
          tool: input.calls[i].tool,
          status: r.status,
          result: r.status === "fulfilled" ? r.value.result : undefined,
          error: r.status === "rejected" ? (r.reason as Error).message : undefined,
        })),
      };
    },
  });
}
