import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { create_pix_transactionSchema, create_card_transactionSchema, get_transactionSchema, refund_transactionSchema } from "./schemas.js";
import { ZoopClient } from "./client.js";

export const zoop_create_pix_transaction = defineTool({
  name: "zoop_create_pix_transaction",
  description: "Create a Pix payment transaction",
  descriptionPt: "Cria uma transação de pagamento Pix",
  inputSchema: create_pix_transactionSchema,
  discovery: {
    tags: ["payments","pix","marketplace","split","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new ZoopClient(context.env);
    return client.create_pix_transaction(input);
  },
});

export const zoop_create_card_transaction = defineTool({
  name: "zoop_create_card_transaction",
  description: "Create a credit card transaction",
  descriptionPt: "Cria uma transação de cartão de crédito",
  inputSchema: create_card_transactionSchema,
  discovery: {
    tags: ["payments","pix","marketplace","split","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new ZoopClient(context.env);
    return client.create_card_transaction(input);
  },
});

export const zoop_get_transaction = defineTool({
  name: "zoop_get_transaction",
  description: "Get transaction details by ID",
  descriptionPt: "Busca detalhes de transação por ID",
  inputSchema: get_transactionSchema,
  discovery: {
    tags: ["payments","pix","marketplace","split","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new ZoopClient(context.env);
    return client.get_transaction(input);
  },
});

export const zoop_refund_transaction = defineTool({
  name: "zoop_refund_transaction",
  description: "Refund a transaction",
  descriptionPt: "Estorna uma transação",
  inputSchema: refund_transactionSchema,
  discovery: {
    tags: ["payments","pix","marketplace","split","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new ZoopClient(context.env);
    return client.refund_transaction(input);
  },
});

export const zoop_list_sellers = defineTool({
  name: "zoop_list_sellers",
  description: "List marketplace sellers",
  descriptionPt: "Lista sellers do marketplace",
  inputSchema: z.object({}),
  discovery: {
    tags: ["payments","pix","marketplace","split","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new ZoopClient(context.env);
    return client.list_sellers(input);
  },
});

export const tools = [zoop_create_pix_transaction, zoop_create_card_transaction, zoop_get_transaction, zoop_refund_transaction, zoop_list_sellers];
