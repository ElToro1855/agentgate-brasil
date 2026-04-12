import { z } from "zod";

export const get_senatorSchema = z.object({
  code: z.string().describe("Senator code"),
});

export const list_mattersSchema = z.object({
  sigla: z.string().describe("Type abbreviation (PLS, PEC, etc.)").optional(),
  ano: z.string().describe("Year").optional(),
});

export const get_matterSchema = z.object({
  code: z.string().describe("Matter code"),
});

export const list_votesSchema = z.object({
  year: z.string().describe("Year"),
});

