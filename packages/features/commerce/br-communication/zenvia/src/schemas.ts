import { z } from "zod";

export const send_messageSchema = z.object({
  channel: z.string().describe("sms, whatsapp, or rcs"),
  from: z.string().describe("Sender ID"),
  to: z.string().describe("Recipient phone"),
  contents: z.record(z.unknown()).describe("Message contents array"),
});

export const get_messageSchema = z.object({
  messageId: z.string().describe("Message ID"),
});

