import { z } from "zod";

export const create_nfeSchema = z.object({
  natureza_operacao: z.string().describe("Operation nature (e.g., Venda)"),
  items: z.record(z.unknown()).describe("Invoice items"),
});

export const get_nfeSchema = z.object({
  id: z.string().describe("NFe ID"),
});

export const cancel_nfeSchema = z.object({
  id: z.string().describe("NFe ID"),
  justificativa: z.string().describe("Cancellation justification (min 15 chars)"),
});

export const get_nfe_pdfSchema = z.object({
  id: z.string().describe("NFe ID"),
});

