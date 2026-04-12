import { z } from "zod";

export const create_saleSchema = z.object({
  MerchantOrderId: z.string().describe("Merchant order ID"),
  Payment: z.record(z.unknown()).describe("Payment details"),
});

export const get_saleSchema = z.object({
  paymentId: z.string().describe("Payment ID"),
});

export const capture_saleSchema = z.object({
  paymentId: z.string().describe("Payment ID"),
});

export const void_saleSchema = z.object({
  paymentId: z.string().describe("Payment ID"),
});

