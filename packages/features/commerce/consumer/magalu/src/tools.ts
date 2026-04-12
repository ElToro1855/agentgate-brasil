import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { search_productsSchema, get_productSchema, check_availabilitySchema } from "./schemas.js";
import { MagaluClient } from "./client.js";

export const magalu_search_products = defineTool({
  name: "magalu_search_products",
  description: "Search products on Magazine Luiza",
  descriptionPt: "Busca produtos na Magazine Luiza",
  inputSchema: search_productsSchema,
  discovery: {
    tags: ["magalu","shopping","retail","electronics","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new MagaluClient(context.env);
    return client.search_products(input);
  },
});

export const magalu_get_product = defineTool({
  name: "magalu_get_product",
  description: "Get product details",
  descriptionPt: "Busca detalhes do produto",
  inputSchema: get_productSchema,
  discovery: {
    tags: ["magalu","shopping","retail","electronics","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new MagaluClient(context.env);
    return client.get_product(input);
  },
});

export const magalu_check_availability = defineTool({
  name: "magalu_check_availability",
  description: "Check product availability by ZIP code",
  descriptionPt: "Verifica disponibilidade do produto por CEP",
  inputSchema: check_availabilitySchema,
  discovery: {
    tags: ["magalu","shopping","retail","electronics","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new MagaluClient(context.env);
    return client.check_availability(input);
  },
});

export const magalu_list_categories = defineTool({
  name: "magalu_list_categories",
  description: "List product categories",
  descriptionPt: "Lista categorias de produtos",
  inputSchema: z.object({}),
  discovery: {
    tags: ["magalu","shopping","retail","electronics","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new MagaluClient(context.env);
    return client.list_categories(input);
  },
});

export const tools = [magalu_search_products, magalu_get_product, magalu_check_availability, magalu_list_categories];
