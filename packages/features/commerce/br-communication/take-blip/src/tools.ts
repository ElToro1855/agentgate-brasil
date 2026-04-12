import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { send_messageSchema, get_contactsSchema } from "./schemas.js";
import { TakeBlipClient } from "./client.js";

export const take_blip_send_message = defineTool({
  name: "take_blip_send_message",
  description: "Send a message to a contact",
  descriptionPt: "Envia mensagem para um contato",
  inputSchema: send_messageSchema,
  discovery: {
    tags: ["chatbot","whatsapp","conversational","commerce","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new TakeBlipClient(context.env);
    return client.send_message(input);
  },
});

export const take_blip_get_contacts = defineTool({
  name: "take_blip_get_contacts",
  description: "List contacts",
  descriptionPt: "Lista contatos",
  inputSchema: get_contactsSchema,
  discovery: {
    tags: ["chatbot","whatsapp","conversational","commerce","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new TakeBlipClient(context.env);
    return client.get_contacts(input);
  },
});

export const tools = [take_blip_send_message, take_blip_get_contacts];
