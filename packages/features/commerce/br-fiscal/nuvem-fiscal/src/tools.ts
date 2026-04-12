import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { create_nfeSchema, get_nfeSchema, cancel_nfeSchema, get_nfe_pdfSchema } from "./schemas.js";
import { NuvemFiscalClient } from "./client.js";

export const nuvem_fiscal_create_nfe = defineTool({
  name: "nuvem_fiscal_create_nfe",
  description: "Issue a new NFe (electronic invoice)",
  descriptionPt: "Emite uma nova NFe (nota fiscal eletrônica)",
  inputSchema: create_nfeSchema,
  discovery: {
    tags: ["fiscal","nfe","invoice","tax","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new NuvemFiscalClient(context.env);
    return client.create_nfe(input);
  },
});

export const nuvem_fiscal_get_nfe = defineTool({
  name: "nuvem_fiscal_get_nfe",
  description: "Get NFe details by ID",
  descriptionPt: "Busca detalhes de NFe por ID",
  inputSchema: get_nfeSchema,
  discovery: {
    tags: ["fiscal","nfe","invoice","tax","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new NuvemFiscalClient(context.env);
    return client.get_nfe(input);
  },
});

export const nuvem_fiscal_cancel_nfe = defineTool({
  name: "nuvem_fiscal_cancel_nfe",
  description: "Cancel an issued NFe",
  descriptionPt: "Cancela uma NFe emitida",
  inputSchema: cancel_nfeSchema,
  discovery: {
    tags: ["fiscal","nfe","invoice","tax","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new NuvemFiscalClient(context.env);
    return client.cancel_nfe(input);
  },
});

export const nuvem_fiscal_get_nfe_pdf = defineTool({
  name: "nuvem_fiscal_get_nfe_pdf",
  description: "Download NFe as PDF (DANFE)",
  descriptionPt: "Baixa NFe como PDF (DANFE)",
  inputSchema: get_nfe_pdfSchema,
  discovery: {
    tags: ["fiscal","nfe","invoice","tax","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new NuvemFiscalClient(context.env);
    return client.get_nfe_pdf(input);
  },
});

export const tools = [nuvem_fiscal_create_nfe, nuvem_fiscal_get_nfe, nuvem_fiscal_cancel_nfe, nuvem_fiscal_get_nfe_pdf];
