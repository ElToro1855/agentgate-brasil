import { defineTool, type FeatureRegistry } from "@agentgate/framework";
import { z } from "zod";

export function createListarFeatures(registry: FeatureRegistry) {
  return defineTool({
    name: "listar_features",
    description: "Lists all available AgentGate features with descriptions",
    descriptionPt: "Lista todas as features AgentGate disponíveis com descrições",
    inputSchema: z.object({
      category: z.enum(["commerce", "data", "agentes"]).optional().describe("Filter by category"),
      language: z.enum(["en", "pt"]).optional().default("pt").describe("Description language"),
    }),
    discovery: {
      tags: ["meta", "discovery", "list", "features"],
      keywords: ["listar", "features", "disponíveis", "list available"],
    },
    handler: async (input) => {
      const features = input.category
        ? registry.filterFeatures({ category: input.category })
        : registry.getAllFeatures();

      return {
        total: features.length,
        features: features.map((f) => ({
          id: f.id,
          name: f.name,
          category: f.category,
          subcategory: f.subcategory,
          description: input.language === "pt" ? f.descriptionPt : f.description,
          tools_count: f.tools.length,
          status: f.status,
          auth_required: f.auth.required,
          governance_enabled: f.governance.enabled,
        })),
      };
    },
  });
}
