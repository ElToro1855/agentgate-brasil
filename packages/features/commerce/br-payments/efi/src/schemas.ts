import { z } from "zod";

export const create_pix_chargeSchema = z.object({
  valor: z.record(z.unknown()).describe("Amount object {original: '10.00'}"),
  chave: z.string().describe("Pix key"),
});

export const get_pix_chargeSchema = z.object({
  txid: z.string().describe("Transaction ID"),
});

export const create_pix_qrcodeSchema = z.object({
  id: z.string().describe("Location ID"),
});

