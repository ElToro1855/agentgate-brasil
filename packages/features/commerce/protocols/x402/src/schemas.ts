import { z } from "zod";

export const payResourceSchema = z.object({
  url: z.string().describe("URL of the resource to pay for"),
  max_amount: z.number().optional().describe("Maximum amount willing to pay (in USD)"),
});

export const checkPriceSchema = z.object({
  url: z.string().describe("URL to check for x402 pricing"),
});

export const getReceiptSchema = z.object({
  payment_id: z.string().describe("Payment ID from a previous x402 payment"),
});

export const listPaymentsSchema = z.object({
  limit: z.number().optional().default(10).describe("Max results"),
});
