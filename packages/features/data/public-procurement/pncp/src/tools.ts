import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { search_contractsSchema, get_contractSchema } from "./schemas.js";
import { PNCPClient } from "./client.js";

export const pncp_search_contracts = defineTool({
  name: "pncp_search_contracts",
  description: "Search public contracts",
  descriptionPt: "Busca contratos públicos",
  inputSchema: search_contractsSchema,
  discovery: {
    tags: ["pncp","procurement","government","contracts","bids","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new PNCPClient(context.env);
    return client.search_contracts(input);
  },
});

export const pncp_get_contract = defineTool({
  name: "pncp_get_contract",
  description: "Get contract details by ID",
  descriptionPt: "Busca detalhes de contrato por ID",
  inputSchema: get_contractSchema,
  discovery: {
    tags: ["pncp","procurement","government","contracts","bids","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new PNCPClient(context.env);
    return client.get_contract(input);
  },
});

export const tools = [pncp_search_contracts, pncp_get_contract];
