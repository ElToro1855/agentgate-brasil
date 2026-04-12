import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { draft_oficioSchema, format_documentSchema, validate_documentSchema } from "./schemas.js";
import { RedatorOficialClient } from "./client.js";

export const redator_oficial_draft_oficio = defineTool({
  name: "redator_oficial_draft_oficio",
  description: "Draft an official letter (ofício) with proper formatting",
  descriptionPt: "Redige um ofício com formatação adequada",
  inputSchema: draft_oficioSchema,
  discovery: {
    tags: ["agent","documents","official","government","writing","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new RedatorOficialClient(context.env);
    return client.draft_oficio(input);
  },
});

export const redator_oficial_format_document = defineTool({
  name: "redator_oficial_format_document",
  description: "Format text into official document structure",
  descriptionPt: "Formata texto em estrutura de documento oficial",
  inputSchema: format_documentSchema,
  discovery: {
    tags: ["agent","documents","official","government","writing","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new RedatorOficialClient(context.env);
    return client.format_document(input);
  },
});

export const redator_oficial_validate_document = defineTool({
  name: "redator_oficial_validate_document",
  description: "Validate an official document against formatting rules",
  descriptionPt: "Valida um documento oficial contra regras de formatação",
  inputSchema: validate_documentSchema,
  discovery: {
    tags: ["agent","documents","official","government","writing","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new RedatorOficialClient(context.env);
    return client.validate_document(input);
  },
});

export const tools = [redator_oficial_draft_oficio, redator_oficial_format_document, redator_oficial_validate_document];
