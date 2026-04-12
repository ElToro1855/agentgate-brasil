import { z } from "zod";

export const analyze_caseSchema = z.object({
  description: z.string().describe("Case description"),
  area: z.string().describe("Legal area: civil, criminal, labor, tax, administrative"),
});

export const search_precedentsSchema = z.object({
  topic: z.string().describe("Legal topic to search"),
  courts: z.string().describe("Comma-separated court codes (STF, STJ, TST)").optional(),
});

export const calculate_deadlinesSchema = z.object({
  event_date: z.string().describe("Event date (YYYY-MM-DD)"),
  deadline_type: z.string().describe("Type: recurso, contestacao, apelacao"),
  court: z.string().describe("Court code"),
});

