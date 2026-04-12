import { z } from "zod";

export const calculate_simplesSchema = z.object({
  revenue_12m: z.number().describe("Last 12 months revenue (BRL)"),
  cnae: z.string().describe("Primary CNAE code"),
  payroll_ratio: z.number().describe("Payroll/revenue ratio (for Factor R)").optional(),
});

export const compare_regimesSchema = z.object({
  revenue_12m: z.number().describe("Annual revenue"),
  cnae: z.string().describe("CNAE code"),
  expenses: z.number().describe("Total deductible expenses").optional(),
});

export const generate_dreSchema = z.object({
  revenue: z.number().describe("Gross revenue"),
  costs: z.number().describe("Cost of goods/services"),
  expenses: z.record(z.unknown()).describe("Expense breakdown"),
});

export const lookup_cnaeSchema = z.object({
  code: z.string().describe("CNAE code (7 digits)"),
});

