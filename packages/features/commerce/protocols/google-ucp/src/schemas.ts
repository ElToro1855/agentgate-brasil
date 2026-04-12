import { z } from "zod";

export const ucp_search_productsSchema = z.object({
  query: z.string().describe("Product search query"),
  max_results: z.number().describe("Max results").optional(),
});

export const ucp_get_productSchema = z.object({
  product_id: z.string().describe("Product ID"),
});

export const ucp_compare_pricesSchema = z.object({
  product_id: z.string().describe("Product ID"),
});

export const ucp_purchaseSchema = z.object({
  product_id: z.string().describe("Product ID"),
  offer_id: z.string().describe("Offer ID from compare"),
  quantity: z.number().describe("Quantity"),
  shipping_address: z.record(z.unknown()).describe("Shipping address"),
});

export const ucp_get_orderSchema = z.object({
  order_id: z.string().describe("Order ID"),
});

