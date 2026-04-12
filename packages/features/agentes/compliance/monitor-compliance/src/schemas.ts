import { z } from "zod";

export const check_entitySchema = z.object({
  cnpj: z.string().describe("Company CNPJ"),
  checks: z.record(z.unknown()).describe("Specific checks to run (sanctions, lawsuits, tax)").optional(),
});

export const generate_reportSchema = z.object({
  cnpj: z.string().describe("Company CNPJ"),
  period: z.string().describe("Report period (e.g., 2026-Q1)").optional(),
});

export const list_alertsSchema = z.object({
  severity: z.string().describe("Filter: low, medium, high, critical").optional(),
});

