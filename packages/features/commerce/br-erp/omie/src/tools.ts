import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { list_customersSchema, get_customerSchema, list_productsSchema, list_invoicesSchema } from "./schemas.js";
import { OmieClient } from "./client.js";

export const omie_list_customers = defineTool({
  name: "omie_list_customers",
  description: "List customers",
  descriptionPt: "Lista clientes",
  inputSchema: list_customersSchema,
  discovery: {
    tags: ["erp","invoicing","products","financial","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new OmieClient(context.env);
    return client.list_customers(input);
  },
});

export const omie_get_customer = defineTool({
  name: "omie_get_customer",
  description: "Get customer details",
  descriptionPt: "Busca detalhes de cliente",
  inputSchema: get_customerSchema,
  discovery: {
    tags: ["erp","invoicing","products","financial","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new OmieClient(context.env);
    return client.get_customer(input);
  },
});

export const omie_list_products = defineTool({
  name: "omie_list_products",
  description: "List products",
  descriptionPt: "Lista produtos",
  inputSchema: list_productsSchema,
  discovery: {
    tags: ["erp","invoicing","products","financial","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new OmieClient(context.env);
    return client.list_products(input);
  },
});

export const omie_list_invoices = defineTool({
  name: "omie_list_invoices",
  description: "List service invoices (NFSe)",
  descriptionPt: "Lista notas fiscais de serviço (NFSe)",
  inputSchema: list_invoicesSchema,
  discovery: {
    tags: ["erp","invoicing","products","financial","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new OmieClient(context.env);
    return client.list_invoices(input);
  },
});

export const tools = [omie_list_customers, omie_get_customer, omie_list_products, omie_list_invoices];
