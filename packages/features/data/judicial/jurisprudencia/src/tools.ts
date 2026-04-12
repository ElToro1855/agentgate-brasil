import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { search_stfSchema, search_stjSchema } from "./schemas.js";
import { JurisprudenciaClient } from "./client.js";

export const jurisprudencia_search_stf = defineTool({
  name: "jurisprudencia_search_stf",
  description: "Search STF (Supreme Federal Court) rulings",
  descriptionPt: "Busca jurisprudência do STF",
  inputSchema: search_stfSchema,
  discovery: {
    tags: ["jurisprudencia","stf","stj","judicial","law","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new JurisprudenciaClient(context.env);
    return client.search_stf(input);
  },
});

export const jurisprudencia_search_stj = defineTool({
  name: "jurisprudencia_search_stj",
  description: "Search STJ (Superior Court of Justice) rulings",
  descriptionPt: "Busca jurisprudência do STJ",
  inputSchema: search_stjSchema,
  discovery: {
    tags: ["jurisprudencia","stf","stj","judicial","law","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new JurisprudenciaClient(context.env);
    return client.search_stj(input);
  },
});

export const tools = [jurisprudencia_search_stf, jurisprudencia_search_stj];
