import { z } from "zod";

export const search_contractsSchema = z.object({
  dataInicial: z.string().optional().describe("Start date (DD/MM/YYYY)"),
  dataFinal: z.string().optional().describe("End date"),
  pagina: z.number().optional().describe("Page"),
});

export const search_spendingSchema = z.object({
  mesAno: z.string().optional().describe("Month/year (YYYYMM)"),
  pagina: z.number().optional().describe("Page"),
});

export const search_server_salariesSchema = z.object({
  nome: z.string().optional().describe("Server name"),
  cpf: z.string().optional().describe("CPF"),
  pagina: z.number().optional().describe("Page"),
});

export const search_grantsSchema = z.object({
  mesAno: z.string().optional().describe("Month/year (YYYYMM)"),
  pagina: z.number().optional().describe("Page"),
});
