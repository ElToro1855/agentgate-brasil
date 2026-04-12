import { z } from "zod";

export const create_chargeSchema = z.object({
  amount: z.number().describe("Amount in cents"),
  payment_method: z.string().describe("CREDIT_CARD, BOLETO, or PIX"),
  customer: z.record(z.unknown()).describe("Customer details"),
});

export const get_chargeSchema = z.object({
  id: z.string().describe("Charge ID"),
});

export const list_chargesSchema = z.object({
  status: z.string().describe("Filter by status").optional(),
});

