import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { search_productsSchema, get_productSchema, list_ordersSchema } from "./schemas.js";
import { TinyClient } from "./client.js";

export const tiny_search_products = defineTool({
  name: "tiny_search_products",
  description: "Search products",
  descriptionPt: "Busca produtos",
  inputSchema: search_productsSchema,
  discovery: {
    tags: ["erp","ecommerce","products","orders","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new TinyClient(context.env);
    return client.search_products(input);
  },
});

export const tiny_get_product = defineTool({
  name: "tiny_get_product",
  description: "Get product details",
  descriptionPt: "Busca detalhes do produto",
  inputSchema: get_productSchema,
  discovery: {
    tags: ["erp","ecommerce","products","orders","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new TinyClient(context.env);
    return client.get_product(input);
  },
});

export const tiny_list_orders = defineTool({
  name: "tiny_list_orders",
  description: "List orders",
  descriptionPt: "Lista pedidos",
  inputSchema: list_ordersSchema,
  discovery: {
    tags: ["erp","ecommerce","products","orders","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new TinyClient(context.env);
    return client.list_orders(input);
  },
});

export const tools = [tiny_search_products, tiny_get_product, tiny_list_orders];
