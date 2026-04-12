import { z } from "zod";

export const list_customersSchema = z.object({
  pagina: z.number().describe("Page number"),
  registros_por_pagina: z.number().describe("Records per page"),
});

export const get_customerSchema = z.object({
  codigo_cliente: z.number().describe("Customer code"),
});

export const list_productsSchema = z.object({
  pagina: z.number().describe("Page number"),
  registros_por_pagina: z.number().describe("Records per page"),
});

export const list_invoicesSchema = z.object({
  pagina: z.number().describe("Page number"),
  registros_por_pagina: z.number().describe("Records per page"),
});

