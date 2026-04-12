import { defineTool } from "@agentgate/framework";
import { search_deliberationsSchema, search_sanctionedSchema } from "./schemas.js";
import { TCUClient } from "./client.js";

const TAGS = ["tcu", "audit", "transparency", "accountability", "brazil", "free"];

export const tcu_search_deliberations = defineTool({
  name: "tcu_search_deliberations",
  description: "Search TCU deliberations and decisions",
  descriptionPt: "Busca deliberações e decisões do TCU",
  inputSchema: search_deliberationsSchema,
  discovery: { tags: TAGS, keywords: [] },
  handler: async (input, context) => {
    const client = new TCUClient(context.env);
    return client.search_deliberations(input);
  },
});

export const tcu_search_sanctioned = defineTool({
  name: "tcu_search_sanctioned",
  description: "Search sanctioned companies/persons (inidôneos)",
  descriptionPt: "Busca empresas/pessoas sancionadas (inidôneos)",
  inputSchema: search_sanctionedSchema,
  discovery: { tags: TAGS, keywords: [] },
  handler: async (input, context) => {
    const client = new TCUClient(context.env);
    return client.search_sanctioned(input);
  },
});

export const tools = [tcu_search_deliberations, tcu_search_sanctioned];
