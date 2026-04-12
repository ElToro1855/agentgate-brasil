import { z } from "zod";

export const track_packageSchema = z.object({
  code: z.string().describe("Tracking code"),
});

export const calculate_shippingSchema = z.object({
  cepOrigem: z.string().describe("Origin CEP"),
  cepDestino: z.string().describe("Destination CEP"),
  peso: z.string().describe("Weight in grams"),
});

