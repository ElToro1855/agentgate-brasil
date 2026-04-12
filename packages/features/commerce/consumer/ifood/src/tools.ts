import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { search_restaurantsSchema, get_restaurantSchema, get_menuSchema, place_orderSchema, track_orderSchema } from "./schemas.js";
import { iFoodClient } from "./client.js";

export const ifood_search_restaurants = defineTool({
  name: "ifood_search_restaurants",
  description: "Search restaurants by location and query",
  descriptionPt: "Busca restaurantes por localização e texto",
  inputSchema: search_restaurantsSchema,
  discovery: {
    tags: ["ifood","food","delivery","restaurant","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new iFoodClient(context.env);
    return client.search_restaurants(input);
  },
});

export const ifood_get_restaurant = defineTool({
  name: "ifood_get_restaurant",
  description: "Get restaurant details and menu",
  descriptionPt: "Busca detalhes do restaurante e cardápio",
  inputSchema: get_restaurantSchema,
  discovery: {
    tags: ["ifood","food","delivery","restaurant","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new iFoodClient(context.env);
    return client.get_restaurant(input);
  },
});

export const ifood_get_menu = defineTool({
  name: "ifood_get_menu",
  description: "Get full menu for a restaurant",
  descriptionPt: "Busca cardápio completo de um restaurante",
  inputSchema: get_menuSchema,
  discovery: {
    tags: ["ifood","food","delivery","restaurant","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new iFoodClient(context.env);
    return client.get_menu(input);
  },
});

export const ifood_place_order = defineTool({
  name: "ifood_place_order",
  description: "Place a food delivery order. GOVERNED.",
  descriptionPt: "Faz um pedido de delivery. GOVERNADO.",
  inputSchema: place_orderSchema,
  discovery: {
    tags: ["ifood","food","delivery","restaurant","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new iFoodClient(context.env);
    return client.place_order(input);
  },
});

export const ifood_track_order = defineTool({
  name: "ifood_track_order",
  description: "Track delivery status of an order",
  descriptionPt: "Rastreia status de entrega de um pedido",
  inputSchema: track_orderSchema,
  discovery: {
    tags: ["ifood","food","delivery","restaurant","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new iFoodClient(context.env);
    return client.track_order(input);
  },
});

export const ifood_list_orders = defineTool({
  name: "ifood_list_orders",
  description: "List recent orders",
  descriptionPt: "Lista pedidos recentes",
  inputSchema: z.object({}),
  discovery: {
    tags: ["ifood","food","delivery","restaurant","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new iFoodClient(context.env);
    return client.list_orders(input);
  },
});

export const tools = [ifood_search_restaurants, ifood_get_restaurant, ifood_get_menu, ifood_place_order, ifood_track_order, ifood_list_orders];
