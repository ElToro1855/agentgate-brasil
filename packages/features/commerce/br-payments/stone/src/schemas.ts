import { z } from "zod";

export const get_balanceSchema = z.object({
  account_id: z.string().describe("Account ID"),
});

export const create_pix_paymentSchema = z.object({
  amount: z.number().describe("Amount in cents"),
  account_id: z.string().describe("Source account ID"),
  target: z.record(z.unknown()).describe("Pix key or bank account target"),
});

export const list_pix_paymentsSchema = z.object({
  account_id: z.string().describe("Account ID"),
});

export const get_pix_paymentSchema = z.object({
  id: z.string().describe("Payment ID"),
});

