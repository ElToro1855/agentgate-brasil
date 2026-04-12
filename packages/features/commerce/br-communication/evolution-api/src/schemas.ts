import { z } from "zod";

export const send_textSchema = z.object({
  instance: z.string().describe("Instance name"),
  number: z.string().describe("Phone number"),
  text: z.string().describe("Message text"),
});

export const send_mediaSchema = z.object({
  instance: z.string().describe("Instance name"),
  number: z.string().describe("Phone number"),
  mediatype: z.string().describe("image, video, audio, document"),
  media: z.string().describe("Media URL"),
});

