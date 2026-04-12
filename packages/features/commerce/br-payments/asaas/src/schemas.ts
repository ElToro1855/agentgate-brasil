import { z } from "zod";

export const create_paymentSchema = z.object({
  customer: z.string().describe("Customer ID"),
  billingType: z.string().describe("BOLETO, CREDIT_CARD, or PIX"),
  value: z.number().describe("Payment amount"),
  dueDate: z.string().describe("Due date (YYYY-MM-DD)"),
  description: z.string().describe("Payment description").optional(),
});

export const get_paymentSchema = z.object({
  id: z.string().describe("Payment ID"),
});

export const list_paymentsSchema = z.object({
  customer: z.string().describe("Filter by customer ID").optional(),
  status: z.string().describe("Filter by status").optional(),
});

export const create_customerSchema = z.object({
  name: z.string().describe("Customer name"),
  cpfCnpj: z.string().describe("CPF or CNPJ"),
  email: z.string().describe("Email").optional(),
});

export const get_pix_qrcodeSchema = z.object({
  id: z.string().describe("Payment ID"),
});

export const create_subscriptionSchema = z.object({
  customer: z.string().describe("Customer ID"),
  billingType: z.string().describe("CREDIT_CARD or BOLETO"),
  value: z.number().describe("Subscription amount"),
  cycle: z.string().describe("MONTHLY, WEEKLY, etc."),
});

