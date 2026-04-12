import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { calculate_simplesSchema, compare_regimesSchema, generate_dreSchema, lookup_cnaeSchema } from "./schemas.js";
import { AnalistaFiscalClient } from "./client.js";

export const analista_fiscal_calculate_simples = defineTool({
  name: "analista_fiscal_calculate_simples",
  description: "Calculate Simples Nacional tax for a company",
  descriptionPt: "Calcula imposto Simples Nacional para uma empresa",
  inputSchema: calculate_simplesSchema,
  discovery: {
    tags: ["agent","tax","fiscal","simples-nacional","dre","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new AnalistaFiscalClient(context.env);
    return client.calculate_simples(input);
  },
});

export const analista_fiscal_compare_regimes = defineTool({
  name: "analista_fiscal_compare_regimes",
  description: "Compare tax regimes (Simples, Lucro Presumido, Lucro Real)",
  descriptionPt: "Compara regimes tributários (Simples, Lucro Presumido, Lucro Real)",
  inputSchema: compare_regimesSchema,
  discovery: {
    tags: ["agent","tax","fiscal","simples-nacional","dre","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new AnalistaFiscalClient(context.env);
    return client.compare_regimes(input);
  },
});

export const analista_fiscal_generate_dre = defineTool({
  name: "analista_fiscal_generate_dre",
  description: "Generate a simplified DRE (income statement)",
  descriptionPt: "Gera uma DRE simplificada (demonstração de resultado)",
  inputSchema: generate_dreSchema,
  discovery: {
    tags: ["agent","tax","fiscal","simples-nacional","dre","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new AnalistaFiscalClient(context.env);
    return client.generate_dre(input);
  },
});

export const analista_fiscal_lookup_cnae = defineTool({
  name: "analista_fiscal_lookup_cnae",
  description: "Look up CNAE code details and tax implications",
  descriptionPt: "Busca detalhes de código CNAE e implicações tributárias",
  inputSchema: lookup_cnaeSchema,
  discovery: {
    tags: ["agent","tax","fiscal","simples-nacional","dre","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new AnalistaFiscalClient(context.env);
    return client.lookup_cnae(input);
  },
});

export const tools = [analista_fiscal_calculate_simples, analista_fiscal_compare_regimes, analista_fiscal_generate_dre, analista_fiscal_lookup_cnae];
