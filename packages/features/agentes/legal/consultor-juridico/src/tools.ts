import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { analyze_caseSchema, search_precedentsSchema, calculate_deadlinesSchema } from "./schemas.js";
import { ConsultorJuridicoClient } from "./client.js";

export const consultor_juridico_analyze_case = defineTool({
  name: "consultor_juridico_analyze_case",
  description: "Analyze a legal case based on description and relevant legislation",
  descriptionPt: "Analisa um caso jurídico com base na descrição e legislação relevante",
  inputSchema: analyze_caseSchema,
  discovery: {
    tags: ["agent","legal","jurisprudence","courts","law","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new ConsultorJuridicoClient(context.env);
    return client.analyze_case(input);
  },
});

export const consultor_juridico_search_precedents = defineTool({
  name: "consultor_juridico_search_precedents",
  description: "Search relevant legal precedents for a case",
  descriptionPt: "Busca precedentes legais relevantes para um caso",
  inputSchema: search_precedentsSchema,
  discovery: {
    tags: ["agent","legal","jurisprudence","courts","law","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new ConsultorJuridicoClient(context.env);
    return client.search_precedents(input);
  },
});

export const consultor_juridico_calculate_deadlines = defineTool({
  name: "consultor_juridico_calculate_deadlines",
  description: "Calculate procedural deadlines",
  descriptionPt: "Calcula prazos processuais",
  inputSchema: calculate_deadlinesSchema,
  discovery: {
    tags: ["agent","legal","jurisprudence","courts","law","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new ConsultorJuridicoClient(context.env);
    return client.calculate_deadlines(input);
  },
});

export const tools = [consultor_juridico_analyze_case, consultor_juridico_search_precedents, consultor_juridico_calculate_deadlines];
