import { z } from "zod";

export const validate_cpfSchema = z.object({
  cpf: z.string().describe("CPF (11 digits)"),
});

export const get_cnpjSchema = z.object({
  cnpj: z.string().describe("CNPJ (14 digits)"),
});
