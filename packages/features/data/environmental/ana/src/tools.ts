import { defineTool } from "@agentgate/framework";
import { list_stationsSchema, get_station_dataSchema } from "./schemas.js";
import { ANAClient } from "./client.js";

const TAGS = ["ana", "water", "reservoirs", "rivers", "environment", "brazil", "free"];

export const ana_list_stations = defineTool({
  name: "ana_list_stations",
  description: "List hydrological monitoring stations",
  descriptionPt: "Lista estações de monitoramento hidrológico",
  inputSchema: list_stationsSchema,
  discovery: { tags: TAGS, keywords: [] },
  handler: async (input, context) => {
    const client = new ANAClient(context.env);
    return client.list_stations(input);
  },
});

export const ana_get_station_data = defineTool({
  name: "ana_get_station_data",
  description: "Get data from a monitoring station",
  descriptionPt: "Busca dados de uma estação de monitoramento",
  inputSchema: get_station_dataSchema,
  discovery: { tags: TAGS, keywords: [] },
  handler: async (input, context) => {
    const client = new ANAClient(context.env);
    return client.get_station_data(input);
  },
});

export const tools = [ana_list_stations, ana_get_station_data];
