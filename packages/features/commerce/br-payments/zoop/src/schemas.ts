import { z } from "zod";

export const create_pix_transactionSchema = z.object({
  amount: z.number().describe("Amount in cents"),
  currency: z.string().describe("Currency code (BRL)"),
  payment_type: z.string().describe("Payment type (pix)"),
  description: z.string().describe("Transaction description").optional(),
});

export const create_card_transactionSchema = z.object({
  amount: z.number().describe("Amount in cents"),
  payment_type: z.string().describe("Payment type (credit)"),
  card_id: z.string().describe("Tokenized card ID"),
});

export const get_transactionSchema = z.object({
  id: z.string().describe("Transaction ID"),
});

export const refund_transactionSchema = z.object({
  id: z.string().describe("Transaction ID"),
  amount: z.number().describe("Partial refund amount in cents (omit for full refund)").optional(),
});

