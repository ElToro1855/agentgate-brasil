import { z } from "zod";

export const search_productsSchema = z.object({
  pesquisa: z.string().describe("Search text").optional(),
  formato: z.string().describe("Response format (json)").optional(),
});

export const get_productSchema = z.object({
  id: z.string().describe("Product ID"),
});

export const list_ordersSchema = z.object({
  dataInicial: z.string().describe("Start date").optional(),
});

