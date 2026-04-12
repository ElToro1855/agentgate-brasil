import { defineTool } from "@agentgate/framework";
import { search_contractsSchema, search_spendingSchema, search_server_salariesSchema, search_grantsSchema } from "./schemas.js";
import { PortalTransparenciaClient } from "./client.js";

const TAGS = ["transparency", "spending", "government", "contracts", "brazil"];

export const portal_transparencia_search_contracts = defineTool({
  name: "portal_transparencia_search_contracts",
  description: "Search federal government contracts",
  descriptionPt: "Busca contratos do governo federal",
  inputSchema: search_contractsSchema,
  discovery: { tags: TAGS, keywords: [] },
  handler: async (input, context) => {
    const client = new PortalTransparenciaClient(context.env);
    return client.search_contracts(input);
  },
});

export const portal_transparencia_search_spending = defineTool({
  name: "portal_transparencia_search_spending",
  description: "Search government spending/expenses",
  descriptionPt: "Busca despesas do governo",
  inputSchema: search_spendingSchema,
  discovery: { tags: TAGS, keywords: [] },
  handler: async (input, context) => {
    const client = new PortalTransparenciaClient(context.env);
    return client.search_spending(input);
  },
});

export const portal_transparencia_search_server_salaries = defineTool({
  name: "portal_transparencia_search_server_salaries",
  description: "Search public servant salary data",
  descriptionPt: "Busca dados salariais de servidores públicos",
  inputSchema: search_server_salariesSchema,
  discovery: { tags: TAGS, keywords: [] },
  handler: async (input, context) => {
    const client = new PortalTransparenciaClient(context.env);
    return client.search_server_salaries(input);
  },
});

export const portal_transparencia_search_grants = defineTool({
  name: "portal_transparencia_search_grants",
  description: "Search government grants (Bolsa Família, BPC, etc.)",
  descriptionPt: "Busca benefícios sociais (Bolsa Família, BPC, etc.)",
  inputSchema: search_grantsSchema,
  discovery: { tags: TAGS, keywords: [] },
  handler: async (input, context) => {
    const client = new PortalTransparenciaClient(context.env);
    return client.search_grants(input);
  },
});

export const tools = [
  portal_transparencia_search_contracts,
  portal_transparencia_search_spending,
  portal_transparencia_search_server_salaries,
  portal_transparencia_search_grants,
];
