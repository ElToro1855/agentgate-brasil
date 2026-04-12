import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { search_storesSchema, get_store_menuSchema, place_orderSchema, track_orderSchema } from "./schemas.js";
import { RappiClient } from "./client.js";

export const rappi_search_stores = defineTool({
  name: "rappi_search_stores",
  description: "Search stores and restaurants near a location",
  descriptionPt: "Busca lojas e restaurantes próximos",
  inputSchema: search_storesSchema,
  discovery: {
    tags: ["rappi","delivery","food","grocery","pharmacy","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new RappiClient(context.env);
    return client.search_stores(input);
  },
});

export const rappi_get_store_menu = defineTool({
  name: "rappi_get_store_menu",
  description: "Get store catalog/menu",
  descriptionPt: "Busca catálogo/cardápio da loja",
  inputSchema: get_store_menuSchema,
  discovery: {
    tags: ["rappi","delivery","food","grocery","pharmacy","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new RappiClient(context.env);
    return client.get_store_menu(input);
  },
});

export const rappi_place_order = defineTool({
  name: "rappi_place_order",
  description: "Place a delivery order. GOVERNED.",
  descriptionPt: "Faz um pedido de entrega. GOVERNADO.",
  inputSchema: place_orderSchema,
  discovery: {
    tags: ["rappi","delivery","food","grocery","pharmacy","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new RappiClient(context.env);
    return client.place_order(input);
  },
});

export const rappi_track_order = defineTool({
  name: "rappi_track_order",
  description: "Track delivery status",
  descriptionPt: "Rastreia status da entrega",
  inputSchema: track_orderSchema,
  discovery: {
    tags: ["rappi","delivery","food","grocery","pharmacy","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new RappiClient(context.env);
    return client.track_order(input);
  },
});

export const tools = [rappi_search_stores, rappi_get_store_menu, rappi_place_order, rappi_track_order];
