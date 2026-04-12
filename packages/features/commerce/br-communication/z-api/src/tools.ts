import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { send_textSchema, send_imageSchema, send_documentSchema, check_numberSchema } from "./schemas.js";
import { ZAPIClient } from "./client.js";

export const z_api_send_text = defineTool({
  name: "z_api_send_text",
  description: "Send a text message via WhatsApp",
  descriptionPt: "Envia uma mensagem de texto via WhatsApp",
  inputSchema: send_textSchema,
  discovery: {
    tags: ["whatsapp","messaging","communication","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new ZAPIClient(context.env);
    return client.send_text(input);
  },
});

export const z_api_send_image = defineTool({
  name: "z_api_send_image",
  description: "Send an image via WhatsApp",
  descriptionPt: "Envia uma imagem via WhatsApp",
  inputSchema: send_imageSchema,
  discovery: {
    tags: ["whatsapp","messaging","communication","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new ZAPIClient(context.env);
    return client.send_image(input);
  },
});

export const z_api_send_document = defineTool({
  name: "z_api_send_document",
  description: "Send a document via WhatsApp",
  descriptionPt: "Envia um documento via WhatsApp",
  inputSchema: send_documentSchema,
  discovery: {
    tags: ["whatsapp","messaging","communication","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new ZAPIClient(context.env);
    return client.send_document(input);
  },
});

export const z_api_get_contacts = defineTool({
  name: "z_api_get_contacts",
  description: "List WhatsApp contacts",
  descriptionPt: "Lista contatos do WhatsApp",
  inputSchema: z.object({}),
  discovery: {
    tags: ["whatsapp","messaging","communication","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new ZAPIClient(context.env);
    return client.get_contacts(input);
  },
});

export const z_api_check_number = defineTool({
  name: "z_api_check_number",
  description: "Check if a phone number has WhatsApp",
  descriptionPt: "Verifica se um número tem WhatsApp",
  inputSchema: check_numberSchema,
  discovery: {
    tags: ["whatsapp","messaging","communication","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new ZAPIClient(context.env);
    return client.check_number(input);
  },
});

export const tools = [z_api_send_text, z_api_send_image, z_api_send_document, z_api_get_contacts, z_api_check_number];
