import { z } from "zod";

export const search_contractsSchema = z.object({
  dataInicial: z.string().describe("Start date (YYYYMMDD)").optional(),
  dataFinal: z.string().describe("End date").optional(),
  pagina: z.number().describe("Page number").optional(),
});

export const get_contractSchema = z.object({
  id: z.string().describe("Contract ID"),
});

