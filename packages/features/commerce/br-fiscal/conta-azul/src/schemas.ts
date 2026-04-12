import { z } from "zod";

export const create_saleSchema = z.object({
  customer_id: z.string().describe("Customer ID"),
  products: z.record(z.unknown()).describe("Products array"),
});

