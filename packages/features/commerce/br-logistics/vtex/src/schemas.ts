import { z } from "zod";

export const list_ordersSchema = z.object({
  page: z.number().describe("Page").optional(),
  per_page: z.number().describe("Per page").optional(),
});

export const get_orderSchema = z.object({
  orderId: z.string().describe("Order ID"),
});

export const search_productsSchema = z.object({
  ft: z.string().describe("Full text search").optional(),
});

