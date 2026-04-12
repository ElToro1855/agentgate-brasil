import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { list_ordersSchema, get_orderSchema, search_productsSchema } from "./schemas.js";
import { VTEXClient } from "./client.js";

export const vtex_list_orders = defineTool({
  name: "vtex_list_orders",
  description: "List orders",
  descriptionPt: "Lista pedidos",
  inputSchema: list_ordersSchema,
  discovery: {
    tags: ["ecommerce","orders","products","inventory","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new VTEXClient(context.env);
    return client.list_orders(input);
  },
});

export const vtex_get_order = defineTool({
  name: "vtex_get_order",
  description: "Get order details",
  descriptionPt: "Busca detalhes do pedido",
  inputSchema: get_orderSchema,
  discovery: {
    tags: ["ecommerce","orders","products","inventory","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new VTEXClient(context.env);
    return client.get_order(input);
  },
});

export const vtex_search_products = defineTool({
  name: "vtex_search_products",
  description: "Search product catalog",
  descriptionPt: "Busca catálogo de produtos",
  inputSchema: search_productsSchema,
  discovery: {
    tags: ["ecommerce","orders","products","inventory","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new VTEXClient(context.env);
    return client.search_products(input);
  },
});

export const tools = [vtex_list_orders, vtex_get_order, vtex_search_products];
