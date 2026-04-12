import { z } from "zod";

export const send_textSchema = z.object({
  phone: z.string().describe("Recipient phone (e.g., 5511999999999)"),
  message: z.string().describe("Message text"),
});

export const send_imageSchema = z.object({
  phone: z.string().describe("Recipient phone"),
  image: z.string().describe("Image URL"),
  caption: z.string().describe("Image caption").optional(),
});

export const send_documentSchema = z.object({
  phone: z.string().describe("Recipient phone"),
  document: z.string().describe("Document URL"),
  fileName: z.string().describe("File name").optional(),
});

export const check_numberSchema = z.object({
  phone: z.string().describe("Phone number to check"),
});

