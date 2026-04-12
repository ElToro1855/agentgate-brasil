import { z } from "zod";

export const list_deputiesSchema = z.object({
  nome: z.string().describe("Filter by name").optional(),
  siglaPartido: z.string().describe("Filter by party (e.g., PT, PL)").optional(),
  siglaUf: z.string().describe("Filter by state (e.g., SP, RJ)").optional(),
});

export const get_deputySchema = z.object({
  id: z.string().describe("Deputy ID"),
});

export const get_deputy_expensesSchema = z.object({
  id: z.string().describe("Deputy ID"),
});

export const list_proposalsSchema = z.object({
  siglaTipo: z.string().describe("Type (PL, PEC, MPV, etc.)").optional(),
  ano: z.string().describe("Year").optional(),
});

export const get_proposalSchema = z.object({
  id: z.string().describe("Proposal ID"),
});

