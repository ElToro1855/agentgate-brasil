import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { get_quoteSchema } from "./schemas.js";
import { B3Client } from "./client.js";

export const b3_get_quote = defineTool({
  name: "b3_get_quote",
  description: "Get stock quote by ticker",
  descriptionPt: "Busca cotação de ação por ticker",
  inputSchema: get_quoteSchema,
  discovery: {
    tags: ["b3", "stocks", "market", "ibovespa", "economic", "brazil", "free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new B3Client(context.env);
    return client.get_quote(input);
  },
});

export const b3_get_ibovespa = defineTool({
  name: "b3_get_ibovespa",
  description: "Get current Ibovespa index",
  descriptionPt: "Busca índice Ibovespa atual",
  inputSchema: z.object({}),
  discovery: {
    tags: ["b3", "stocks", "market", "ibovespa", "economic", "brazil", "free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new B3Client(context.env);
    return client.get_ibovespa(input);
  },
});

export const tools = [b3_get_quote, b3_get_ibovespa];
