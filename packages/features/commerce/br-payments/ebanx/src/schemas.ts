import { z } from "zod";

export const create_paymentSchema = z.object({
  payment_type_code: z.string().describe("pix, boleto, creditcard"),
  amount_total: z.number().describe("Total amount"),
  currency_code: z.string().describe("Currency (BRL, USD)"),
  name: z.string().describe("Customer name"),
  email: z.string().describe("Customer email"),
  document: z.string().describe("CPF/CNPJ"),
});

export const get_paymentSchema = z.object({
  hash: z.string().describe("Payment hash"),
});

