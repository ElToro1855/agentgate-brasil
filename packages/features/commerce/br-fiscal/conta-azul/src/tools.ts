import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { create_saleSchema } from "./schemas.js";
import { ContaAzulClient } from "./client.js";

export const conta_azul_list_customers = defineTool({
  name: "conta_azul_list_customers",
  description: "List customers",
  descriptionPt: "Lista clientes",
  inputSchema: z.object({}),
  discovery: {
    tags: ["accounting","invoicing","financial","smb","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new ContaAzulClient(context.env);
    return client.list_customers(input);
  },
});

export const conta_azul_create_sale = defineTool({
  name: "conta_azul_create_sale",
  description: "Create a sale",
  descriptionPt: "Cria uma venda",
  inputSchema: create_saleSchema,
  discovery: {
    tags: ["accounting","invoicing","financial","smb","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new ContaAzulClient(context.env);
    return client.create_sale(input);
  },
});

export const conta_azul_list_products = defineTool({
  name: "conta_azul_list_products",
  description: "List products",
  descriptionPt: "Lista produtos",
  inputSchema: z.object({}),
  discovery: {
    tags: ["accounting","invoicing","financial","smb","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new ContaAzulClient(context.env);
    return client.list_products(input);
  },
});

export const tools = [conta_azul_list_customers, conta_azul_create_sale, conta_azul_list_products];
