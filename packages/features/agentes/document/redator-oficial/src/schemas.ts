import { z } from "zod";

export const draft_oficioSchema = z.object({
  type: z.string().describe("Document type: oficio, parecer, portaria, despacho"),
  subject: z.string().describe("Document subject"),
  body_instructions: z.string().describe("Instructions for the document body"),
  sender: z.string().describe("Sender name and title"),
  recipient: z.string().describe("Recipient name and title").optional(),
});

export const format_documentSchema = z.object({
  text: z.string().describe("Raw text to format"),
  template: z.string().describe("Template: oficio, parecer, portaria"),
});

export const validate_documentSchema = z.object({
  document: z.string().describe("Document text to validate"),
  type: z.string().describe("Expected document type"),
});

