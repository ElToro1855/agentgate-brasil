import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { get_senatorSchema, list_mattersSchema, get_matterSchema, list_votesSchema } from "./schemas.js";
import { SenadoFederalClient } from "./client.js";

export const senado_list_senators = defineTool({
  name: "senado_list_senators",
  description: "List current senators",
  descriptionPt: "Lista senadores atuais",
  inputSchema: z.object({}),
  discovery: {
    tags: ["senado","senate","senators","legislation","government","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new SenadoFederalClient(context.env);
    return client.list_senators(input);
  },
});

export const senado_get_senator = defineTool({
  name: "senado_get_senator",
  description: "Get senator details by code",
  descriptionPt: "Busca detalhes de senador por código",
  inputSchema: get_senatorSchema,
  discovery: {
    tags: ["senado","senate","senators","legislation","government","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new SenadoFederalClient(context.env);
    return client.get_senator(input);
  },
});

export const senado_list_matters = defineTool({
  name: "senado_list_matters",
  description: "List legislative matters",
  descriptionPt: "Lista matérias legislativas",
  inputSchema: list_mattersSchema,
  discovery: {
    tags: ["senado","senate","senators","legislation","government","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new SenadoFederalClient(context.env);
    return client.list_matters(input);
  },
});

export const senado_get_matter = defineTool({
  name: "senado_get_matter",
  description: "Get matter details by code",
  descriptionPt: "Busca detalhes de matéria por código",
  inputSchema: get_matterSchema,
  discovery: {
    tags: ["senado","senate","senators","legislation","government","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new SenadoFederalClient(context.env);
    return client.get_matter(input);
  },
});

export const senado_list_votes = defineTool({
  name: "senado_list_votes",
  description: "List recent Senate votes",
  descriptionPt: "Lista votações recentes do Senado",
  inputSchema: list_votesSchema,
  discovery: {
    tags: ["senado","senate","senators","legislation","government","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new SenadoFederalClient(context.env);
    return client.list_votes(input);
  },
});

export const tools = [senado_list_senators, senado_get_senator, senado_list_matters, senado_get_matter, senado_list_votes];
