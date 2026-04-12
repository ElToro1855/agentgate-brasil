import { z } from "zod";

export const list_electionsSchema = z.object({
  year: z.string().describe("Election year (e.g., 2022)"),
});

export const search_candidatesSchema = z.object({
  year: z.string().describe("Election year"),
  election_id: z.string().describe("Election ID"),
});

export const get_candidateSchema = z.object({
  year: z.string().describe("Year"),
  election_id: z.string().describe("Election ID"),
  candidate_id: z.string().describe("Candidate ID"),
});

