import { defineTool } from "@agentgate/framework";
import { search_suppliersSchema, search_pricesSchema, search_bidsSchema } from "./schemas.js";
import { ComprasGovClient } from "./client.js";

const TAGS = ["compras-gov", "procurement", "bids", "government", "prices", "brazil", "free"];

export const compras_gov_search_suppliers = defineTool({
  name: "compras_gov_search_suppliers",
  description: "Search government suppliers",
  descriptionPt: "Busca fornecedores do governo",
  inputSchema: search_suppliersSchema,
  discovery: { tags: TAGS, keywords: [] },
  handler: async (input, context) => {
    const client = new ComprasGovClient(context.env);
    return client.search_suppliers(input);
  },
});

export const compras_gov_search_prices = defineTool({
  name: "compras_gov_search_prices",
  description: "Search practiced prices in government purchases",
  descriptionPt: "Busca preços praticados em compras governamentais",
  inputSchema: search_pricesSchema,
  discovery: { tags: TAGS, keywords: [] },
  handler: async (input, context) => {
    const client = new ComprasGovClient(context.env);
    return client.search_prices(input);
  },
});

export const compras_gov_search_bids = defineTool({
  name: "compras_gov_search_bids",
  description: "Search government bids/tenders",
  descriptionPt: "Busca licitações governamentais",
  inputSchema: search_bidsSchema,
  discovery: { tags: TAGS, keywords: [] },
  handler: async (input, context) => {
    const client = new ComprasGovClient(context.env);
    return client.search_bids(input);
  },
});

export const tools = [compras_gov_search_suppliers, compras_gov_search_prices, compras_gov_search_bids];
