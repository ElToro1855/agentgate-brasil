import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { get_productSchema, create_orderSchema } from "./schemas.js";
import { BlingClient } from "./client.js";

export const bling_list_products = defineTool({
  name: "bling_list_products",
  description: "List products",
  descriptionPt: "Lista produtos",
  inputSchema: z.object({}),
  discovery: {
    tags: ["erp","products","orders","inventory","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new BlingClient(context.env);
    return client.list_products(input);
  },
});

export const bling_get_product = defineTool({
  name: "bling_get_product",
  description: "Get product details",
  descriptionPt: "Busca detalhes do produto",
  inputSchema: get_productSchema,
  discovery: {
    tags: ["erp","products","orders","inventory","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new BlingClient(context.env);
    return client.get_product(input);
  },
});

export const bling_list_orders = defineTool({
  name: "bling_list_orders",
  description: "List sales orders",
  descriptionPt: "Lista pedidos de venda",
  inputSchema: z.object({}),
  discovery: {
    tags: ["erp","products","orders","inventory","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new BlingClient(context.env);
    return client.list_orders(input);
  },
});

export const bling_create_order = defineTool({
  name: "bling_create_order",
  description: "Create a sales order",
  descriptionPt: "Cria um pedido de venda",
  inputSchema: create_orderSchema,
  discovery: {
    tags: ["erp","products","orders","inventory","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new BlingClient(context.env);
    return client.create_order(input);
  },
});

export const tools = [bling_list_products, bling_get_product, bling_list_orders, bling_create_order];
