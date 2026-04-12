import { z } from "zod";

export const search_hospitalizationsSchema = z.object({
  q: z.string().optional().describe("Search query"),
});

export const get_health_indicatorsSchema = z.object({
  q: z.string().optional().describe("Search query"),
});
