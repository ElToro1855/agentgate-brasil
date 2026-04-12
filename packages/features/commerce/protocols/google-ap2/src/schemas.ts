import { z } from "zod";

export const ap2_create_mandateSchema = z.object({
  agent_id: z.string().describe("Agent identifier"),
  merchant_id: z.string().describe("Merchant identifier"),
  max_amount: z.number().describe("Maximum authorized amount"),
  currency: z.string().describe("Currency code"),
  valid_until: z.string().describe("Mandate expiry (ISO 8601)"),
});

export const ap2_execute_paymentSchema = z.object({
  mandate_id: z.string().describe("Mandate ID"),
  amount: z.number().describe("Payment amount"),
  description: z.string().describe("Payment description").optional(),
});

export const ap2_get_mandateSchema = z.object({
  mandate_id: z.string().describe("Mandate ID"),
});

export const ap2_list_paymentsSchema = z.object({
  mandate_id: z.string().describe("Mandate ID"),
});

