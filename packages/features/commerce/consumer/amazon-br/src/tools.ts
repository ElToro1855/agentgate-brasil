import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { search_itemsSchema, get_itemSchema, get_browse_nodesSchema } from "./schemas.js";
import { AmazonBRClient } from "./client.js";

export const amazon_br_search_items = defineTool({
  name: "amazon_br_search_items",
  description: "Search products on Amazon Brazil",
  descriptionPt: "Busca produtos na Amazon Brasil",
  inputSchema: search_itemsSchema,
  discovery: {
    tags: ["amazon","shopping","products","reviews","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new AmazonBRClient(context.env);
    return client.search_items(input);
  },
});

export const amazon_br_get_item = defineTool({
  name: "amazon_br_get_item",
  description: "Get product details by ASIN",
  descriptionPt: "Busca detalhes do produto por ASIN",
  inputSchema: get_itemSchema,
  discovery: {
    tags: ["amazon","shopping","products","reviews","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new AmazonBRClient(context.env);
    return client.get_item(input);
  },
});

export const amazon_br_get_browse_nodes = defineTool({
  name: "amazon_br_get_browse_nodes",
  description: "Browse product categories",
  descriptionPt: "Navega categorias de produtos",
  inputSchema: get_browse_nodesSchema,
  discovery: {
    tags: ["amazon","shopping","products","reviews","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new AmazonBRClient(context.env);
    return client.get_browse_nodes(input);
  },
});

export const tools = [amazon_br_search_items, amazon_br_get_item, amazon_br_get_browse_nodes];
