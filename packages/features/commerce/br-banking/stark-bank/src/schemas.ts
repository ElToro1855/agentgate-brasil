import { z } from "zod";

export const create_transferSchema = z.object({
  amount: z.number().describe("Amount in cents"),
  bankCode: z.string().describe("Bank code"),
  branchCode: z.string().describe("Branch"),
  accountNumber: z.string().describe("Account"),
  taxId: z.string().describe("CPF/CNPJ"),
  name: z.string().describe("Recipient name"),
});

export const create_boletoSchema = z.object({
  amount: z.number().describe("Amount in cents"),
  name: z.string().describe("Payer name"),
  taxId: z.string().describe("CPF/CNPJ"),
  due: z.string().describe("Due date"),
});

export const list_transactionsSchema = z.object({
  limit: z.number().describe("Max results").optional(),
});

