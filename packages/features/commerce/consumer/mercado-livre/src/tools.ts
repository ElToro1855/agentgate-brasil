import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { search_productsSchema, get_productSchema, get_product_descriptionSchema, get_sellerSchema, create_purchaseSchema, list_purchasesSchema } from "./schemas.js";
import { MercadoLivreClient } from "./client.js";

export const mercado_livre_search_products = defineTool({
  name: "mercado_livre_search_products",
  description: "Search products on Mercado Livre",
  descriptionPt: "Busca produtos no Mercado Livre",
  inputSchema: search_productsSchema,
  discovery: {
    tags: ["mercado-livre","marketplace","shopping","products","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new MercadoLivreClient(context.env);
    return client.search_products(input);
  },
});

export const mercado_livre_get_product = defineTool({
  name: "mercado_livre_get_product",
  description: "Get product listing details",
  descriptionPt: "Busca detalhes de um anúncio",
  inputSchema: get_productSchema,
  discovery: {
    tags: ["mercado-livre","marketplace","shopping","products","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new MercadoLivreClient(context.env);
    return client.get_product(input);
  },
});

export const mercado_livre_get_product_description = defineTool({
  name: "mercado_livre_get_product_description",
  description: "Get product full description",
  descriptionPt: "Busca descrição completa do produto",
  inputSchema: get_product_descriptionSchema,
  discovery: {
    tags: ["mercado-livre","marketplace","shopping","products","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new MercadoLivreClient(context.env);
    return client.get_product_description(input);
  },
});

export const mercado_livre_list_categories = defineTool({
  name: "mercado_livre_list_categories",
  description: "List product categories",
  descriptionPt: "Lista categorias de produtos",
  inputSchema: z.object({}),
  discovery: {
    tags: ["mercado-livre","marketplace","shopping","products","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new MercadoLivreClient(context.env);
    return client.list_categories(input);
  },
});

export const mercado_livre_get_seller = defineTool({
  name: "mercado_livre_get_seller",
  description: "Get seller information and reputation",
  descriptionPt: "Busca informações e reputação do vendedor",
  inputSchema: get_sellerSchema,
  discovery: {
    tags: ["mercado-livre","marketplace","shopping","products","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new MercadoLivreClient(context.env);
    return client.get_seller(input);
  },
});

export const mercado_livre_create_purchase = defineTool({
  name: "mercado_livre_create_purchase",
  description: "Create a purchase order. GOVERNED.",
  descriptionPt: "Cria um pedido de compra. GOVERNADO.",
  inputSchema: create_purchaseSchema,
  discovery: {
    tags: ["mercado-livre","marketplace","shopping","products","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new MercadoLivreClient(context.env);
    return client.create_purchase(input);
  },
});

export const mercado_livre_list_purchases = defineTool({
  name: "mercado_livre_list_purchases",
  description: "List recent purchases",
  descriptionPt: "Lista compras recentes",
  inputSchema: list_purchasesSchema,
  discovery: {
    tags: ["mercado-livre","marketplace","shopping","products","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new MercadoLivreClient(context.env);
    return client.list_purchases(input);
  },
});

export const tools = [mercado_livre_search_products, mercado_livre_get_product, mercado_livre_get_product_description, mercado_livre_list_categories, mercado_livre_get_seller, mercado_livre_create_purchase, mercado_livre_list_purchases];
