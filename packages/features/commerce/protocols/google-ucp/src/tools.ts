import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { ucp_search_productsSchema, ucp_get_productSchema, ucp_compare_pricesSchema, ucp_purchaseSchema, ucp_get_orderSchema } from "./schemas.js";
import { GoogleUCPClient } from "./client.js";

export const google_ucp_search_products = defineTool({
  name: "google_ucp_search_products",
  description: "Search products across UCP merchants",
  descriptionPt: "Busca produtos em comerciantes UCP",
  inputSchema: ucp_search_productsSchema,
  discovery: {
    tags: ["google","ucp","commerce","shopping","products"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new GoogleUCPClient(context.env);
    return client.ucp_search_products(input);
  },
});

export const google_ucp_get_product = defineTool({
  name: "google_ucp_get_product",
  description: "Get product details by ID",
  descriptionPt: "Busca detalhes de produto por ID",
  inputSchema: ucp_get_productSchema,
  discovery: {
    tags: ["google","ucp","commerce","shopping","products"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new GoogleUCPClient(context.env);
    return client.ucp_get_product(input);
  },
});

export const google_ucp_compare_prices = defineTool({
  name: "google_ucp_compare_prices",
  description: "Compare prices across merchants for a product",
  descriptionPt: "Compara preços entre comerciantes para um produto",
  inputSchema: ucp_compare_pricesSchema,
  discovery: {
    tags: ["google","ucp","commerce","shopping","products"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new GoogleUCPClient(context.env);
    return client.ucp_compare_prices(input);
  },
});

export const google_ucp_purchase = defineTool({
  name: "google_ucp_purchase",
  description: "Purchase a product through UCP. GOVERNED.",
  descriptionPt: "Compra um produto via UCP. GOVERNADO.",
  inputSchema: ucp_purchaseSchema,
  discovery: {
    tags: ["google","ucp","commerce","shopping","products"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new GoogleUCPClient(context.env);
    return client.ucp_purchase(input);
  },
});

export const google_ucp_get_order = defineTool({
  name: "google_ucp_get_order",
  description: "Get order status",
  descriptionPt: "Busca status de pedido",
  inputSchema: ucp_get_orderSchema,
  discovery: {
    tags: ["google","ucp","commerce","shopping","products"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new GoogleUCPClient(context.env);
    return client.ucp_get_order(input);
  },
});

export const tools = [google_ucp_search_products, google_ucp_get_product, google_ucp_compare_prices, google_ucp_purchase, google_ucp_get_order];
