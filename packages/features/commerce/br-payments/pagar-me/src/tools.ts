import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { create_chargeSchema, get_chargeSchema, list_chargesSchema, create_recipientSchema } from "./schemas.js";
import { PagarMeClient } from "./client.js";

export const pagar_me_create_charge = defineTool({
  name: "pagar_me_create_charge",
  description: "Create a new charge (Pix, boleto, or credit card)",
  descriptionPt: "Cria uma nova cobrança (Pix, boleto ou cartão)",
  inputSchema: create_chargeSchema,
  discovery: {
    tags: ["payments","pix","credit-card","boleto","split","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new PagarMeClient(context.env);
    return client.create_charge(input);
  },
});

export const pagar_me_get_charge = defineTool({
  name: "pagar_me_get_charge",
  description: "Get charge details",
  descriptionPt: "Busca detalhes de cobrança",
  inputSchema: get_chargeSchema,
  discovery: {
    tags: ["payments","pix","credit-card","boleto","split","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new PagarMeClient(context.env);
    return client.get_charge(input);
  },
});

export const pagar_me_list_charges = defineTool({
  name: "pagar_me_list_charges",
  description: "List charges",
  descriptionPt: "Lista cobranças",
  inputSchema: list_chargesSchema,
  discovery: {
    tags: ["payments","pix","credit-card","boleto","split","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new PagarMeClient(context.env);
    return client.list_charges(input);
  },
});

export const pagar_me_create_recipient = defineTool({
  name: "pagar_me_create_recipient",
  description: "Create a payment recipient (for split)",
  descriptionPt: "Cria um recebedor (para split de pagamentos)",
  inputSchema: create_recipientSchema,
  discovery: {
    tags: ["payments","pix","credit-card","boleto","split","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new PagarMeClient(context.env);
    return client.create_recipient(input);
  },
});

export const tools = [pagar_me_create_charge, pagar_me_get_charge, pagar_me_list_charges, pagar_me_create_recipient];
