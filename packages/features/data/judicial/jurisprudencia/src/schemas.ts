import { z } from "zod";

export const search_stfSchema = z.object({
  query: z.string().describe("Search query"),
  page: z.number().describe("Page number").optional(),
});

export const search_stjSchema = z.object({
  query: z.string().describe("Search query"),
});

