import { z } from "zod";

export const create_contactSchema = z.object({
  email: z.string().describe("Contact email"),
  name: z.string().describe("Contact name").optional(),
  tags: z.record(z.unknown()).describe("Tags array").optional(),
});

export const create_eventSchema = z.object({
  event_type: z.string().describe("CONVERSION or OPPORTUNITY"),
  event_family: z.string().describe("CDP"),
  payload: z.record(z.unknown()).describe("Event data"),
});

