import { z } from "zod";

export const send_messageSchema = z.object({
  to: z.string().describe("Contact identifier"),
  type: z.string().describe("text/plain, application/json, etc."),
  content: z.string().describe("Message content"),
});

export const get_contactsSchema = z.object({
  method: z.string().describe("get"),
  uri: z.string().describe("/contacts"),
});

