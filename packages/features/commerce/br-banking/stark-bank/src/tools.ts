import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { create_transferSchema, create_boletoSchema, list_transactionsSchema } from "./schemas.js";
import { StarkBankClient } from "./client.js";

export const stark_bank_get_balance = defineTool({
  name: "stark_bank_get_balance",
  description: "Get account balance",
  descriptionPt: "Consulta saldo da conta",
  inputSchema: z.object({}),
  discovery: {
    tags: ["banking","pix","transfer","boleto","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new StarkBankClient(context.env);
    return client.get_balance(input);
  },
});

export const stark_bank_create_transfer = defineTool({
  name: "stark_bank_create_transfer",
  description: "Create a bank transfer",
  descriptionPt: "Cria uma transferência bancária",
  inputSchema: create_transferSchema,
  discovery: {
    tags: ["banking","pix","transfer","boleto","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new StarkBankClient(context.env);
    return client.create_transfer(input);
  },
});

export const stark_bank_create_boleto = defineTool({
  name: "stark_bank_create_boleto",
  description: "Create a boleto payment slip",
  descriptionPt: "Cria um boleto bancário",
  inputSchema: create_boletoSchema,
  discovery: {
    tags: ["banking","pix","transfer","boleto","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new StarkBankClient(context.env);
    return client.create_boleto(input);
  },
});

export const stark_bank_list_transactions = defineTool({
  name: "stark_bank_list_transactions",
  description: "List account transactions",
  descriptionPt: "Lista transações da conta",
  inputSchema: list_transactionsSchema,
  discovery: {
    tags: ["banking","pix","transfer","boleto","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new StarkBankClient(context.env);
    return client.list_transactions(input);
  },
});

export const tools = [stark_bank_get_balance, stark_bank_create_transfer, stark_bank_create_boleto, stark_bank_list_transactions];
