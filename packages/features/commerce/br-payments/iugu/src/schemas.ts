import { z } from "zod";

export const create_invoiceSchema = z.object({
  email: z.string().describe("Customer email"),
  due_date: z.string().describe("Due date"),
  items: z.record(z.unknown()).describe("Invoice items"),
});

export const get_invoiceSchema = z.object({
  id: z.string().describe("Invoice ID"),
});

export const create_subscriptionSchema = z.object({
  plan_identifier: z.string().describe("Plan ID"),
  customer_id: z.string().describe("Customer ID"),
});

