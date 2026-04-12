import { z } from "zod";

export const search_suppliersSchema = z.object({
  cnpj: z.string().optional().describe("Supplier CNPJ"),
  nome: z.string().optional().describe("Supplier name"),
});

export const search_pricesSchema = z.object({
  co_material_servico: z.string().optional().describe("Material/service code"),
});

export const search_bidsSchema = z.object({
  uasg: z.string().optional().describe("UASG code (procurement agency)"),
});
