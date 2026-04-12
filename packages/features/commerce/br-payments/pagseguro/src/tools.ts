import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { create_chargeSchema, get_chargeSchema, list_chargesSchema } from "./schemas.js";
import { PagSeguroClient } from "./client.js";

export const pagseguro_create_charge = defineTool({
  name: "pagseguro_create_charge",
  description: "Create a payment charge",
  descriptionPt: "Cria uma cobrança",
  inputSchema: create_chargeSchema,
  discovery: {
    tags: ["payments","pix","boleto","credit-card","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new PagSeguroClient(context.env);
    return client.create_charge(input);
  },
});

export const pagseguro_get_charge = defineTool({
  name: "pagseguro_get_charge",
  description: "Get charge details",
  descriptionPt: "Busca detalhes de cobrança",
  inputSchema: get_chargeSchema,
  discovery: {
    tags: ["payments","pix","boleto","credit-card","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new PagSeguroClient(context.env);
    return client.get_charge(input);
  },
});

export const pagseguro_list_charges = defineTool({
  name: "pagseguro_list_charges",
  description: "List charges",
  descriptionPt: "Lista cobranças",
  inputSchema: list_chargesSchema,
  discovery: {
    tags: ["payments","pix","boleto","credit-card","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new PagSeguroClient(context.env);
    return client.list_charges(input);
  },
});

export const tools = [pagseguro_create_charge, pagseguro_get_charge, pagseguro_list_charges];
