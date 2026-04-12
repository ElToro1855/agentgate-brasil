import { z } from "zod";

export const search_restaurantsSchema = z.object({
  latitude: z.string().describe("Latitude"),
  longitude: z.string().describe("Longitude"),
  query: z.string().describe("Search text").optional(),
});

export const get_restaurantSchema = z.object({
  merchant_id: z.string().describe("Restaurant ID"),
});

export const get_menuSchema = z.object({
  merchant_id: z.string().describe("Restaurant ID"),
});

export const place_orderSchema = z.object({
  merchant_id: z.string().describe("Restaurant ID"),
  items: z.record(z.unknown()).describe("Order items array"),
  delivery_address: z.record(z.unknown()).describe("Delivery address"),
  payment_method: z.string().describe("Payment method"),
});

export const track_orderSchema = z.object({
  order_id: z.string().describe("Order ID"),
});

