import { z } from "zod";

export const get_productSchema = z.object({
  id: z.string().describe("Product ID"),
});

export const create_orderSchema = z.object({
  contato: z.record(z.unknown()).describe("Customer contact"),
  itens: z.record(z.unknown()).describe("Order items"),
});

