import { z } from "zod";

export const get_balanceSchema = z.object({
  accountId: z.string().describe("Account ID"),
});

export const list_transactionsSchema = z.object({
  accountId: z.string().describe("Account ID"),
});

