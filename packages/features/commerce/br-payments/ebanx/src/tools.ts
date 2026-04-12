import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { create_paymentSchema, get_paymentSchema } from "./schemas.js";
import { EBANXClient } from "./client.js";

export const ebanx_create_payment = defineTool({
  name: "ebanx_create_payment",
  description: "Create a cross-border payment",
  descriptionPt: "Cria um pagamento cross-border",
  inputSchema: create_paymentSchema,
  discovery: {
    tags: ["payments","cross-border","pix","brazil","latam"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new EBANXClient(context.env);
    return client.create_payment(input);
  },
});

export const ebanx_get_payment = defineTool({
  name: "ebanx_get_payment",
  description: "Query payment status",
  descriptionPt: "Consulta status de pagamento",
  inputSchema: get_paymentSchema,
  discovery: {
    tags: ["payments","cross-border","pix","brazil","latam"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new EBANXClient(context.env);
    return client.get_payment(input);
  },
});

export const tools = [ebanx_create_payment, ebanx_get_payment];
