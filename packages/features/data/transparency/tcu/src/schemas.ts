import { z } from "zod";

export const search_deliberationsSchema = z.object({
  query: z.string().optional().describe("Search text"),
  ano: z.string().optional().describe("Year"),
});

export const search_sanctionedSchema = z.object({
  cpfCnpj: z.string().optional().describe("CPF or CNPJ"),
  nome: z.string().optional().describe("Name"),
});
