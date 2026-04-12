import { z } from "zod";

export const search_facilitiesSchema = z.object({
  codigo_cnes: z.string().optional().describe("CNES code"),
  nome_fantasia: z.string().optional().describe("Facility name"),
  codigo_uf: z.string().optional().describe("State code"),
});

export const search_professionalsSchema = z.object({
  codigo_cnes: z.string().optional().describe("Facility CNES code"),
});
