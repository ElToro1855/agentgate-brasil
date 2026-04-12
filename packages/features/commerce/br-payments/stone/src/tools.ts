import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { get_balanceSchema, create_pix_paymentSchema, list_pix_paymentsSchema, get_pix_paymentSchema } from "./schemas.js";
import { StoneClient } from "./client.js";

export const stone_get_balance = defineTool({
  name: "stone_get_balance",
  description: "Get account balance",
  descriptionPt: "Consulta saldo da conta",
  inputSchema: get_balanceSchema,
  discovery: {
    tags: ["payments","open-banking","pix","stone","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new StoneClient(context.env);
    return client.get_balance(input);
  },
});

export const stone_create_pix_payment = defineTool({
  name: "stone_create_pix_payment",
  description: "Create a Pix payment",
  descriptionPt: "Cria um pagamento Pix",
  inputSchema: create_pix_paymentSchema,
  discovery: {
    tags: ["payments","open-banking","pix","stone","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new StoneClient(context.env);
    return client.create_pix_payment(input);
  },
});

export const stone_list_pix_payments = defineTool({
  name: "stone_list_pix_payments",
  description: "List Pix payments",
  descriptionPt: "Lista pagamentos Pix",
  inputSchema: list_pix_paymentsSchema,
  discovery: {
    tags: ["payments","open-banking","pix","stone","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new StoneClient(context.env);
    return client.list_pix_payments(input);
  },
});

export const stone_get_pix_payment = defineTool({
  name: "stone_get_pix_payment",
  description: "Get Pix payment details",
  descriptionPt: "Busca detalhes de pagamento Pix",
  inputSchema: get_pix_paymentSchema,
  discovery: {
    tags: ["payments","open-banking","pix","stone","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new StoneClient(context.env);
    return client.get_pix_payment(input);
  },
});

export const tools = [stone_get_balance, stone_create_pix_payment, stone_list_pix_payments, stone_get_pix_payment];
