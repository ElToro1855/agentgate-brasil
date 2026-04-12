import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { list_electionsSchema, search_candidatesSchema, get_candidateSchema } from "./schemas.js";
import { TSEClient } from "./client.js";

export const tse_list_elections = defineTool({
  name: "tse_list_elections",
  description: "List elections by year",
  descriptionPt: "Lista eleições por ano",
  inputSchema: list_electionsSchema,
  discovery: {
    tags: ["tse","elections","candidates","campaign","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new TSEClient(context.env);
    return client.list_elections(input);
  },
});

export const tse_search_candidates = defineTool({
  name: "tse_search_candidates",
  description: "Search candidates by name",
  descriptionPt: "Busca candidatos por nome",
  inputSchema: search_candidatesSchema,
  discovery: {
    tags: ["tse","elections","candidates","campaign","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new TSEClient(context.env);
    return client.search_candidates(input);
  },
});

export const tse_get_candidate = defineTool({
  name: "tse_get_candidate",
  description: "Get candidate details",
  descriptionPt: "Busca detalhes de candidato",
  inputSchema: get_candidateSchema,
  discovery: {
    tags: ["tse","elections","candidates","campaign","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new TSEClient(context.env);
    return client.get_candidate(input);
  },
});

export const tools = [tse_list_elections, tse_search_candidates, tse_get_candidate];
