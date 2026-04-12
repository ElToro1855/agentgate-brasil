import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { create_billSchema, get_billSchema, create_subscriptionSchema } from "./schemas.js";
import { VindiClient } from "./client.js";

export const vindi_create_bill = defineTool({
  name: "vindi_create_bill",
  description: "Create a billing charge",
  descriptionPt: "Cria uma cobrança",
  inputSchema: create_billSchema,
  discovery: {
    tags: ["payments","subscriptions","recurring","billing","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new VindiClient(context.env);
    return client.create_bill(input);
  },
});

export const vindi_get_bill = defineTool({
  name: "vindi_get_bill",
  description: "Get bill details",
  descriptionPt: "Busca detalhes de cobrança",
  inputSchema: get_billSchema,
  discovery: {
    tags: ["payments","subscriptions","recurring","billing","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new VindiClient(context.env);
    return client.get_bill(input);
  },
});

export const vindi_create_subscription = defineTool({
  name: "vindi_create_subscription",
  description: "Create a subscription",
  descriptionPt: "Cria uma assinatura",
  inputSchema: create_subscriptionSchema,
  discovery: {
    tags: ["payments","subscriptions","recurring","billing","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new VindiClient(context.env);
    return client.create_subscription(input);
  },
});

export const vindi_list_customers = defineTool({
  name: "vindi_list_customers",
  description: "List customers",
  descriptionPt: "Lista clientes",
  inputSchema: z.object({}),
  discovery: {
    tags: ["payments","subscriptions","recurring","billing","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new VindiClient(context.env);
    return client.list_customers(input);
  },
});

export const tools = [vindi_create_bill, vindi_get_bill, vindi_create_subscription, vindi_list_customers];
