import { z } from "zod";

export const createPaymentIntentSchema = z.object({
  amount: z.number().describe("Amount in smallest currency unit (e.g., cents)"),
  currency: z.string().default("usd").describe("Three-letter ISO currency code"),
  description: z.string().optional().describe("Payment description"),
  metadata: z.record(z.string()).optional().describe("Key-value metadata"),
});

export const confirmPaymentIntentSchema = z.object({
  payment_intent_id: z.string().describe("Stripe PaymentIntent ID (pi_xxx)"),
  payment_method: z.string().optional().describe("Payment method ID"),
});

export const getPaymentIntentSchema = z.object({
  payment_intent_id: z.string().describe("Stripe PaymentIntent ID (pi_xxx)"),
});

export const listPaymentIntentsSchema = z.object({
  limit: z.number().optional().default(10).describe("Max results (1-100)"),
  starting_after: z.string().optional().describe("Cursor for pagination"),
});
