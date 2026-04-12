import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { get_stateSchema, list_municipalitiesSchema, get_municipalitySchema } from "./schemas.js";
import { IBGEClient } from "./client.js";

export const ibge_list_states = defineTool({
  name: "ibge_list_states",
  description: "List all Brazilian states (UFs)",
  descriptionPt: "Lista todos os estados brasileiros (UFs)",
  inputSchema: z.object({}),
  discovery: {
    tags: ["ibge","statistics","population","states","municipalities","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new IBGEClient(context.env);
    return client.list_states(input);
  },
});

export const ibge_get_state = defineTool({
  name: "ibge_get_state",
  description: "Get state details by UF code",
  descriptionPt: "Busca detalhes do estado por código UF",
  inputSchema: get_stateSchema,
  discovery: {
    tags: ["ibge","statistics","population","states","municipalities","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new IBGEClient(context.env);
    return client.get_state(input);
  },
});

export const ibge_list_municipalities = defineTool({
  name: "ibge_list_municipalities",
  description: "List all municipalities in a state",
  descriptionPt: "Lista todos os municípios de um estado",
  inputSchema: list_municipalitiesSchema,
  discovery: {
    tags: ["ibge","statistics","population","states","municipalities","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new IBGEClient(context.env);
    return client.list_municipalities(input);
  },
});

export const ibge_list_all_municipalities = defineTool({
  name: "ibge_list_all_municipalities",
  description: "List all Brazilian municipalities",
  descriptionPt: "Lista todos os municípios brasileiros",
  inputSchema: z.object({}),
  discovery: {
    tags: ["ibge","statistics","population","states","municipalities","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new IBGEClient(context.env);
    return client.list_all_municipalities(input);
  },
});

export const ibge_get_municipality = defineTool({
  name: "ibge_get_municipality",
  description: "Get municipality details by IBGE code",
  descriptionPt: "Busca detalhes do município por código IBGE",
  inputSchema: get_municipalitySchema,
  discovery: {
    tags: ["ibge","statistics","population","states","municipalities","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new IBGEClient(context.env);
    return client.get_municipality(input);
  },
});

export const tools = [ibge_list_states, ibge_get_state, ibge_list_municipalities, ibge_list_all_municipalities, ibge_get_municipality];
