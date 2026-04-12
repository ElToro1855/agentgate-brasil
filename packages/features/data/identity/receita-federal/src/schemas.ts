import { z } from "zod";

export const get_cnpj_detailsSchema = z.object({
  cnpj: z.string().describe("CNPJ (14 digits)"),
});
