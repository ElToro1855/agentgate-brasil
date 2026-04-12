import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { create_pix_transferSchema, pay_billSchema } from "./schemas.js";
import { CelcoinClient } from "./client.js";

export const celcoin_create_pix_transfer = defineTool({
  name: "celcoin_create_pix_transfer",
  description: "Create a Pix transfer",
  descriptionPt: "Cria uma transferência Pix",
  inputSchema: create_pix_transferSchema,
  discovery: {
    tags: ["payments","pix","baas","bill-payment","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new CelcoinClient(context.env);
    return client.create_pix_transfer(input);
  },
});

export const celcoin_pay_bill = defineTool({
  name: "celcoin_pay_bill",
  description: "Pay a utility bill",
  descriptionPt: "Paga uma conta de consumo",
  inputSchema: pay_billSchema,
  discovery: {
    tags: ["payments","pix","baas","bill-payment","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new CelcoinClient(context.env);
    return client.pay_bill(input);
  },
});

export const celcoin_get_balance = defineTool({
  name: "celcoin_get_balance",
  description: "Get account balance",
  descriptionPt: "Consulta saldo",
  inputSchema: z.object({}),
  discovery: {
    tags: ["payments","pix","baas","bill-payment","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new CelcoinClient(context.env);
    return client.get_balance(input);
  },
});

export const tools = [celcoin_create_pix_transfer, celcoin_pay_bill, celcoin_get_balance];
