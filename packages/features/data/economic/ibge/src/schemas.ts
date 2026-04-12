import { z } from "zod";

export const get_stateSchema = z.object({
  uf: z.string().describe("UF code (e.g., SP, RJ, MG)"),
});

export const list_municipalitiesSchema = z.object({
  uf: z.string().describe("UF code"),
});

export const get_municipalitySchema = z.object({
  id: z.string().describe("IBGE municipality code"),
});

