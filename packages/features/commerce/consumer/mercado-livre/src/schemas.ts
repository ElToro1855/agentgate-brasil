import { z } from "zod";

export const search_productsSchema = z.object({
  q: z.string().describe("Search query"),
  limit: z.number().describe("Max results").optional(),
  category: z.string().describe("Category ID").optional(),
});

export const get_productSchema = z.object({
  item_id: z.string().describe("Item ID (MLB...)"),
});

export const get_product_descriptionSchema = z.object({
  item_id: z.string().describe("Item ID"),
});

export const get_sellerSchema = z.object({
  seller_id: z.string().describe("Seller user ID"),
});

export const create_purchaseSchema = z.object({
  item_id: z.string().describe("Item ID"),
  quantity: z.number().describe("Quantity"),
});

export const list_purchasesSchema = z.object({
  buyer: z.string().describe("Buyer user ID").optional(),
});

