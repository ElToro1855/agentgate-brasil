import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { list_deputiesSchema, get_deputySchema, get_deputy_expensesSchema, list_proposalsSchema, get_proposalSchema } from "./schemas.js";
import { CmaradosDeputadosClient } from "./client.js";

export const camara_list_deputies = defineTool({
  name: "camara_list_deputies",
  description: "List current deputies with optional filters",
  descriptionPt: "Lista deputados atuais com filtros opcionais",
  inputSchema: list_deputiesSchema,
  discovery: {
    tags: ["camara","deputies","legislation","votes","expenses","government","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new CmaradosDeputadosClient(context.env);
    return client.list_deputies(input);
  },
});

export const camara_get_deputy = defineTool({
  name: "camara_get_deputy",
  description: "Get deputy details by ID",
  descriptionPt: "Busca detalhes de deputado por ID",
  inputSchema: get_deputySchema,
  discovery: {
    tags: ["camara","deputies","legislation","votes","expenses","government","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new CmaradosDeputadosClient(context.env);
    return client.get_deputy(input);
  },
});

export const camara_get_deputy_expenses = defineTool({
  name: "camara_get_deputy_expenses",
  description: "Get a deputy's expense reports",
  descriptionPt: "Busca relatórios de despesas de um deputado",
  inputSchema: get_deputy_expensesSchema,
  discovery: {
    tags: ["camara","deputies","legislation","votes","expenses","government","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new CmaradosDeputadosClient(context.env);
    return client.get_deputy_expenses(input);
  },
});

export const camara_list_proposals = defineTool({
  name: "camara_list_proposals",
  description: "List legislative proposals",
  descriptionPt: "Lista proposições legislativas",
  inputSchema: list_proposalsSchema,
  discovery: {
    tags: ["camara","deputies","legislation","votes","expenses","government","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new CmaradosDeputadosClient(context.env);
    return client.list_proposals(input);
  },
});

export const camara_get_proposal = defineTool({
  name: "camara_get_proposal",
  description: "Get proposal details by ID",
  descriptionPt: "Busca detalhes de proposição por ID",
  inputSchema: get_proposalSchema,
  discovery: {
    tags: ["camara","deputies","legislation","votes","expenses","government","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new CmaradosDeputadosClient(context.env);
    return client.get_proposal(input);
  },
});

export const tools = [camara_list_deputies, camara_get_deputy, camara_get_deputy_expenses, camara_list_proposals, camara_get_proposal];
