import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { ap2_create_mandateSchema, ap2_execute_paymentSchema, ap2_get_mandateSchema, ap2_list_paymentsSchema } from "./schemas.js";
import { GoogleAP2Client } from "./client.js";

export const google_ap2_create_mandate = defineTool({
  name: "google_ap2_create_mandate",
  description: "Create an HMAC payment mandate for an agent",
  descriptionPt: "Cria um mandato de pagamento HMAC para um agente",
  inputSchema: ap2_create_mandateSchema,
  discovery: {
    tags: ["google","ap2","agent-payments","hmac","commerce"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new GoogleAP2Client(context.env);
    return client.ap2_create_mandate(input);
  },
});

export const google_ap2_execute_payment = defineTool({
  name: "google_ap2_execute_payment",
  description: "Execute a payment under an existing mandate. GOVERNED.",
  descriptionPt: "Executa um pagamento sob um mandato existente. GOVERNADO.",
  inputSchema: ap2_execute_paymentSchema,
  discovery: {
    tags: ["google","ap2","agent-payments","hmac","commerce"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new GoogleAP2Client(context.env);
    return client.ap2_execute_payment(input);
  },
});

export const google_ap2_get_mandate = defineTool({
  name: "google_ap2_get_mandate",
  description: "Get mandate details and remaining balance",
  descriptionPt: "Busca detalhes do mandato e saldo restante",
  inputSchema: ap2_get_mandateSchema,
  discovery: {
    tags: ["google","ap2","agent-payments","hmac","commerce"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new GoogleAP2Client(context.env);
    return client.ap2_get_mandate(input);
  },
});

export const google_ap2_list_payments = defineTool({
  name: "google_ap2_list_payments",
  description: "List payments under a mandate",
  descriptionPt: "Lista pagamentos sob um mandato",
  inputSchema: ap2_list_paymentsSchema,
  discovery: {
    tags: ["google","ap2","agent-payments","hmac","commerce"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new GoogleAP2Client(context.env);
    return client.ap2_list_payments(input);
  },
});

export const tools = [google_ap2_create_mandate, google_ap2_execute_payment, google_ap2_get_mandate, google_ap2_list_payments];
