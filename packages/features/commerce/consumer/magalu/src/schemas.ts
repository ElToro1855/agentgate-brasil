import { z } from "zod";

export const search_productsSchema = z.object({
  q: z.string().describe("Search query"),
  limit: z.number().describe("Max results").optional(),
});

export const get_productSchema = z.object({
  sku: z.string().describe("Product SKU"),
});

export const check_availabilitySchema = z.object({
  sku: z.string().describe("Product SKU"),
  zipcode: z.string().describe("ZIP code (CEP)"),
});

