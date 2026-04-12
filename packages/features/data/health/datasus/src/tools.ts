import { defineTool } from "@agentgate/framework";
import { search_hospitalizationsSchema, get_health_indicatorsSchema } from "./schemas.js";
import { DataSUSClient } from "./client.js";

const TAGS = ["datasus", "health", "epidemiology", "mortality", "hospitals", "brazil", "free"];

export const datasus_search_hospitalizations = defineTool({
  name: "datasus_search_hospitalizations",
  description: "Search SIH hospitalization records",
  descriptionPt: "Busca registros de internação SIH",
  inputSchema: search_hospitalizationsSchema,
  discovery: { tags: TAGS, keywords: [] },
  handler: async (input, context) => {
    const client = new DataSUSClient(context.env);
    return client.search_hospitalizations(input);
  },
});

export const datasus_get_health_indicators = defineTool({
  name: "datasus_get_health_indicators",
  description: "Get health indicators by state/municipality",
  descriptionPt: "Busca indicadores de saúde por estado/município",
  inputSchema: get_health_indicatorsSchema,
  discovery: { tags: TAGS, keywords: [] },
  handler: async (input, context) => {
    const client = new DataSUSClient(context.env);
    return client.get_health_indicators(input);
  },
});

export const tools = [datasus_search_hospitalizations, datasus_get_health_indicators];
