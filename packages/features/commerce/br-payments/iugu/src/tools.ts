import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { create_invoiceSchema, get_invoiceSchema, create_subscriptionSchema } from "./schemas.js";
import { IuguClient } from "./client.js";

export const iugu_create_invoice = defineTool({
  name: "iugu_create_invoice",
  description: "Create an invoice",
  descriptionPt: "Cria uma fatura",
  inputSchema: create_invoiceSchema,
  discovery: {
    tags: ["payments","subscriptions","invoicing","split","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new IuguClient(context.env);
    return client.create_invoice(input);
  },
});

export const iugu_get_invoice = defineTool({
  name: "iugu_get_invoice",
  description: "Get invoice details",
  descriptionPt: "Busca detalhes de fatura",
  inputSchema: get_invoiceSchema,
  discovery: {
    tags: ["payments","subscriptions","invoicing","split","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new IuguClient(context.env);
    return client.get_invoice(input);
  },
});

export const iugu_create_subscription = defineTool({
  name: "iugu_create_subscription",
  description: "Create a subscription",
  descriptionPt: "Cria uma assinatura",
  inputSchema: create_subscriptionSchema,
  discovery: {
    tags: ["payments","subscriptions","invoicing","split","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new IuguClient(context.env);
    return client.create_subscription(input);
  },
});

export const tools = [iugu_create_invoice, iugu_get_invoice, iugu_create_subscription];
