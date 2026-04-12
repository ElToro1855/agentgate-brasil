import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { send_messageSchema, get_messageSchema } from "./schemas.js";
import { ZenviaClient } from "./client.js";

export const zenvia_send_message = defineTool({
  name: "zenvia_send_message",
  description: "Send a message via any channel",
  descriptionPt: "Envia mensagem por qualquer canal",
  inputSchema: send_messageSchema,
  discovery: {
    tags: ["sms","whatsapp","rcs","messaging","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new ZenviaClient(context.env);
    return client.send_message(input);
  },
});

export const zenvia_get_message = defineTool({
  name: "zenvia_get_message",
  description: "Get message status",
  descriptionPt: "Consulta status de mensagem",
  inputSchema: get_messageSchema,
  discovery: {
    tags: ["sms","whatsapp","rcs","messaging","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new ZenviaClient(context.env);
    return client.get_message(input);
  },
});

export const tools = [zenvia_send_message, zenvia_get_message];
