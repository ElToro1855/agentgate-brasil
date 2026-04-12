import { z } from "zod";

export const create_pix_transferSchema = z.object({
  amount: z.number().describe("Amount"),
  key: z.string().describe("Pix key"),
  keyType: z.string().describe("Key type (cpf, cnpj, email, phone, evp)"),
});

export const pay_billSchema = z.object({
  barcode: z.string().describe("Bill barcode"),
});

