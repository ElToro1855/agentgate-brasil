import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { create_paymentSchema, get_paymentSchema, list_paymentsSchema, create_customerSchema, get_pix_qrcodeSchema, create_subscriptionSchema } from "./schemas.js";
import { AsaasClient } from "./client.js";

export const asaas_create_payment = defineTool({
  name: "asaas_create_payment",
  description: "Create a new payment/charge",
  descriptionPt: "Cria uma nova cobrança",
  inputSchema: create_paymentSchema,
  discovery: {
    tags: ["payments","pix","boleto","invoicing","subscriptions","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new AsaasClient(context.env);
    return client.create_payment(input);
  },
});

export const asaas_get_payment = defineTool({
  name: "asaas_get_payment",
  description: "Get payment details",
  descriptionPt: "Busca detalhes de cobrança",
  inputSchema: get_paymentSchema,
  discovery: {
    tags: ["payments","pix","boleto","invoicing","subscriptions","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new AsaasClient(context.env);
    return client.get_payment(input);
  },
});

export const asaas_list_payments = defineTool({
  name: "asaas_list_payments",
  description: "List payments with filters",
  descriptionPt: "Lista cobranças com filtros",
  inputSchema: list_paymentsSchema,
  discovery: {
    tags: ["payments","pix","boleto","invoicing","subscriptions","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new AsaasClient(context.env);
    return client.list_payments(input);
  },
});

export const asaas_create_customer = defineTool({
  name: "asaas_create_customer",
  description: "Create a new customer",
  descriptionPt: "Cria um novo cliente",
  inputSchema: create_customerSchema,
  discovery: {
    tags: ["payments","pix","boleto","invoicing","subscriptions","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new AsaasClient(context.env);
    return client.create_customer(input);
  },
});

export const asaas_get_pix_qrcode = defineTool({
  name: "asaas_get_pix_qrcode",
  description: "Get Pix QR code for a payment",
  descriptionPt: "Busca QR code Pix de uma cobrança",
  inputSchema: get_pix_qrcodeSchema,
  discovery: {
    tags: ["payments","pix","boleto","invoicing","subscriptions","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new AsaasClient(context.env);
    return client.get_pix_qrcode(input);
  },
});

export const asaas_create_subscription = defineTool({
  name: "asaas_create_subscription",
  description: "Create a recurring subscription",
  descriptionPt: "Cria uma assinatura recorrente",
  inputSchema: create_subscriptionSchema,
  discovery: {
    tags: ["payments","pix","boleto","invoicing","subscriptions","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new AsaasClient(context.env);
    return client.create_subscription(input);
  },
});

export const tools = [asaas_create_payment, asaas_get_payment, asaas_list_payments, asaas_create_customer, asaas_get_pix_qrcode, asaas_create_subscription];
