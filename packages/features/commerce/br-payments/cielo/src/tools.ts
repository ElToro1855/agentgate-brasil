import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { create_saleSchema, get_saleSchema, capture_saleSchema, void_saleSchema } from "./schemas.js";
import { CieloClient } from "./client.js";

export const cielo_create_sale = defineTool({
  name: "cielo_create_sale",
  description: "Create a card sale/transaction",
  descriptionPt: "Cria uma venda/transação de cartão",
  inputSchema: create_saleSchema,
  discovery: {
    tags: ["payments","credit-card","debit-card","cielo","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new CieloClient(context.env);
    return client.create_sale(input);
  },
});

export const cielo_get_sale = defineTool({
  name: "cielo_get_sale",
  description: "Get sale details",
  descriptionPt: "Busca detalhes de venda",
  inputSchema: get_saleSchema,
  discovery: {
    tags: ["payments","credit-card","debit-card","cielo","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new CieloClient(context.env);
    return client.get_sale(input);
  },
});

export const cielo_capture_sale = defineTool({
  name: "cielo_capture_sale",
  description: "Capture a pre-authorized sale",
  descriptionPt: "Captura uma venda pré-autorizada",
  inputSchema: capture_saleSchema,
  discovery: {
    tags: ["payments","credit-card","debit-card","cielo","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new CieloClient(context.env);
    return client.capture_sale(input);
  },
});

export const cielo_void_sale = defineTool({
  name: "cielo_void_sale",
  description: "Void/cancel a sale",
  descriptionPt: "Cancela uma venda",
  inputSchema: void_saleSchema,
  discovery: {
    tags: ["payments","credit-card","debit-card","cielo","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new CieloClient(context.env);
    return client.void_sale(input);
  },
});

export const tools = [cielo_create_sale, cielo_get_sale, cielo_capture_sale, cielo_void_sale];
