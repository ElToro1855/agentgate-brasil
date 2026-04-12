import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { send_textSchema, send_mediaSchema } from "./schemas.js";
import { EvolutionAPIClient } from "./client.js";

export const evolution_api_send_text = defineTool({
  name: "evolution_api_send_text",
  description: "Send text message",
  descriptionPt: "Envia mensagem de texto",
  inputSchema: send_textSchema,
  discovery: {
    tags: ["whatsapp","messaging","communication","open-source","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new EvolutionAPIClient(context.env);
    return client.send_text(input);
  },
});

export const evolution_api_send_media = defineTool({
  name: "evolution_api_send_media",
  description: "Send media message",
  descriptionPt: "Envia mensagem com mídia",
  inputSchema: send_mediaSchema,
  discovery: {
    tags: ["whatsapp","messaging","communication","open-source","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new EvolutionAPIClient(context.env);
    return client.send_media(input);
  },
});

export const tools = [evolution_api_send_text, evolution_api_send_media];
