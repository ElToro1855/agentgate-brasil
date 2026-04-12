import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { search_gazettesSchema } from "./schemas.js";
import { DiarioOficialClient } from "./client.js";

export const diario_oficial_search_gazettes = defineTool({
  name: "diario_oficial_search_gazettes",
  description: "Search official gazette publications",
  descriptionPt: "Busca publicações do Diário Oficial",
  inputSchema: search_gazettesSchema,
  discovery: {
    tags: ["diario-oficial","dou","legislation","gazette","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new DiarioOficialClient(context.env);
    return client.search_gazettes(input);
  },
});

export const tools = [diario_oficial_search_gazettes];
