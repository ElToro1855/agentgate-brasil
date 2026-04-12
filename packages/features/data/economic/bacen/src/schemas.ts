import { z } from "zod";

export const get_seriesSchema = z.object({
  series_code: z.string().describe("Series code (e.g., 432 for Selic, 433 for IPCA)"),
});

export const get_series_lastSchema = z.object({
  series_code: z.string().describe("Series code"),
  count: z.string().describe("Number of last values"),
});

