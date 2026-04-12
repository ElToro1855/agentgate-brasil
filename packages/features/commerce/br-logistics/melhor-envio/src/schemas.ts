import { z } from "zod";

export const calculate_shippingSchema = z.object({
  from_postal_code: z.string().describe("Origin ZIP code"),
  to_postal_code: z.string().describe("Destination ZIP code"),
  width: z.number().describe("Package width in cm"),
  height: z.number().describe("Package height in cm"),
  length: z.number().describe("Package length in cm"),
  weight: z.number().describe("Package weight in kg"),
});

export const create_shipmentSchema = z.object({
  service: z.number().describe("Service ID from quote"),
  from: z.record(z.unknown()).describe("Sender details"),
  to: z.record(z.unknown()).describe("Recipient details"),
});

export const track_shipmentSchema = z.object({
  orders: z.string().describe("Comma-separated order IDs"),
});

export const generate_labelSchema = z.object({
  orders: z.record(z.unknown()).describe("Array of order IDs"),
});

