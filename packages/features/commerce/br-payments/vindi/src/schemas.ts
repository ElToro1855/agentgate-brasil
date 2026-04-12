import { z } from "zod";

export const create_billSchema = z.object({
  customer_id: z.number().describe("Customer ID"),
  payment_method_code: z.string().describe("credit_card, bank_slip, pix"),
  bill_items: z.record(z.unknown()).describe("Billing items"),
});

export const get_billSchema = z.object({
  id: z.string().describe("Bill ID"),
});

export const create_subscriptionSchema = z.object({
  plan_id: z.number().describe("Plan ID"),
  customer_id: z.number().describe("Customer ID"),
  payment_method_code: z.string().describe("Payment method"),
});

