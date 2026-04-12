import { z } from "zod";

export const search_processesSchema = z.object({
  query: z.record(z.any()).describe("Elasticsearch query object"),
});

export const get_processSchema = z.object({
  npu: z.string().describe("Unified process number (20 digits)"),
});
