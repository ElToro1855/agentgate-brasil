import { z } from "zod";

export const create_nfeSchema = z.object({
  natureza_operacao: z.string().describe("Operation nature"),
  items: z.record(z.unknown()).describe("Invoice items"),
});

export const get_nfeSchema = z.object({
  ref: z.string().describe("Reference ID"),
});

