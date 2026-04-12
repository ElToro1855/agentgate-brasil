import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { get_active_firesSchema, get_fire_countSchema } from "./schemas.js";
import { INPEClient } from "./client.js";

export const inpe_get_active_fires = defineTool({
  name: "inpe_get_active_fires",
  description: "Get active fire hotspots in Brazil",
  descriptionPt: "Busca focos de incêndio ativos no Brasil",
  inputSchema: get_active_firesSchema,
  discovery: {
    tags: ["inpe","fires","deforestation","satellite","environment","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new INPEClient(context.env);
    return client.get_active_fires(input);
  },
});

export const inpe_get_fire_count = defineTool({
  name: "inpe_get_fire_count",
  description: "Get fire count by state and period",
  descriptionPt: "Busca contagem de focos por estado e período",
  inputSchema: get_fire_countSchema,
  discovery: {
    tags: ["inpe","fires","deforestation","satellite","environment","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new INPEClient(context.env);
    return client.get_fire_count(input);
  },
});

export const tools = [inpe_get_active_fires, inpe_get_fire_count];
