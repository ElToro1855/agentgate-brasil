import { z } from "zod";

export const create_chargeSchema = z.object({
  amount: z.number().describe("Amount in cents"),
  payment_method: z.string().describe("pix, boleto, or credit_card"),
  customer: z.record(z.unknown()).describe("Customer details"),
});

export const get_chargeSchema = z.object({
  id: z.string().describe("Charge ID"),
});

export const list_chargesSchema = z.object({
  page: z.number().describe("Page").optional(),
  size: z.number().describe("Page size").optional(),
});

export const create_recipientSchema = z.object({
  name: z.string().describe("Recipient name"),
  document: z.string().describe("CPF/CNPJ"),
  type: z.string().describe("individual or company"),
});

