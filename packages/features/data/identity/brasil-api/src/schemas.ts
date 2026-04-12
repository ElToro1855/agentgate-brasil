import { z } from "zod";

export const get_cepSchema = z.object({
  cep: z.string().describe("Brazilian ZIP code (8 digits)"),
});

export const get_cnpjSchema = z.object({
  cnpj: z.string().describe("CNPJ number (14 digits)"),
});

export const get_bankSchema = z.object({
  code: z.string().describe("Bank code (3 digits)"),
});

export const list_holidaysSchema = z.object({
  year: z.string().describe("Year (e.g., 2026)"),
});

export const get_dddSchema = z.object({
  ddd: z.string().describe("Area code (2 digits, e.g., 11 for São Paulo)"),
});

export const get_fipeSchema = z.object({
  fipe_code: z.string().describe("FIPE reference code"),
});

export const list_fipe_brandsSchema = z.object({
  vehicle_type: z.string().describe("Vehicle type: carros, motos, or caminhoes"),
});

