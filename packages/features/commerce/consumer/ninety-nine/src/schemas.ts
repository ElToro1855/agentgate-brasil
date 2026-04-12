import { z } from "zod";

export const estimate_rideSchema = z.object({
  origin_lat: z.number().describe("Origin latitude"),
  origin_lng: z.number().describe("Origin longitude"),
  dest_lat: z.number().describe("Destination latitude"),
  dest_lng: z.number().describe("Destination longitude"),
});

export const request_rideSchema = z.object({
  origin_lat: z.number().describe("Origin latitude"),
  origin_lng: z.number().describe("Origin longitude"),
  dest_lat: z.number().describe("Destination latitude"),
  dest_lng: z.number().describe("Destination longitude"),
  category: z.string().describe("Ride category (pop, comfort, etc.)").optional(),
});

export const track_rideSchema = z.object({
  ride_id: z.string().describe("Ride ID"),
});

export const cancel_rideSchema = z.object({
  ride_id: z.string().describe("Ride ID"),
});

