import { defineTool } from "@agentgate/framework";
import { search_facilitiesSchema, search_professionalsSchema } from "./schemas.js";
import { CNESClient } from "./client.js";

const TAGS = ["cnes", "health", "hospitals", "clinics", "professionals", "brazil", "free"];

export const cnes_search_facilities = defineTool({
  name: "cnes_search_facilities",
  description: "Search health facilities by name or CNES code",
  descriptionPt: "Busca estabelecimentos de saúde por nome ou código CNES",
  inputSchema: search_facilitiesSchema,
  discovery: { tags: TAGS, keywords: [] },
  handler: async (input, context) => {
    const client = new CNESClient(context.env);
    return client.search_facilities(input);
  },
});

export const cnes_search_professionals = defineTool({
  name: "cnes_search_professionals",
  description: "Search health professionals",
  descriptionPt: "Busca profissionais de saúde",
  inputSchema: search_professionalsSchema,
  discovery: { tags: TAGS, keywords: [] },
  handler: async (input, context) => {
    const client = new CNESClient(context.env);
    return client.search_professionals(input);
  },
});

export const tools = [cnes_search_facilities, cnes_search_professionals];
