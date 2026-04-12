import { z } from "zod";

export const search_gazettesSchema = z.object({
  querystring: z.string().describe("Search text").optional(),
  territory_id: z.string().describe("IBGE territory code").optional(),
  since: z.string().describe("Start date (YYYY-MM-DD)").optional(),
  until: z.string().describe("End date (YYYY-MM-DD)").optional(),
});

