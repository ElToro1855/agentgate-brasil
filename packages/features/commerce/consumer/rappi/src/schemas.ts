import { z } from "zod";

export const search_storesSchema = z.object({
  lat: z.string().describe("Latitude"),
  lng: z.string().describe("Longitude"),
  query: z.string().describe("Search text").optional(),
});

export const get_store_menuSchema = z.object({
  store_id: z.string().describe("Store ID"),
});

export const place_orderSchema = z.object({
  store_id: z.string().describe("Store ID"),
  items: z.record(z.unknown()).describe("Order items"),
  address: z.record(z.unknown()).describe("Delivery address"),
});

export const track_orderSchema = z.object({
  order_id: z.string().describe("Order ID"),
});

