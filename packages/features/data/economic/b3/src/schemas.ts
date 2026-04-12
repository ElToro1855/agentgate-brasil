import { z } from "zod";

export const get_quoteSchema = z.object({
  ticker: z.string().describe("Stock ticker (e.g., PETR4, VALE3)"),
});
