import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { get_balanceSchema, list_transactionsSchema } from "./schemas.js";
import { OpenFinanceClient } from "./client.js";

export const open_finance_list_accounts = defineTool({
  name: "open_finance_list_accounts",
  description: "List linked bank accounts",
  descriptionPt: "Lista contas bancárias vinculadas",
  inputSchema: z.object({}),
  discovery: {
    tags: ["open-banking","open-finance","banking","pix","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new OpenFinanceClient(context.env);
    return client.list_accounts(input);
  },
});

export const open_finance_get_balance = defineTool({
  name: "open_finance_get_balance",
  description: "Get account balance",
  descriptionPt: "Consulta saldo da conta",
  inputSchema: get_balanceSchema,
  discovery: {
    tags: ["open-banking","open-finance","banking","pix","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new OpenFinanceClient(context.env);
    return client.get_balance(input);
  },
});

export const open_finance_list_transactions = defineTool({
  name: "open_finance_list_transactions",
  description: "List account transactions",
  descriptionPt: "Lista transações da conta",
  inputSchema: list_transactionsSchema,
  discovery: {
    tags: ["open-banking","open-finance","banking","pix","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new OpenFinanceClient(context.env);
    return client.list_transactions(input);
  },
});

export const tools = [open_finance_list_accounts, open_finance_get_balance, open_finance_list_transactions];
