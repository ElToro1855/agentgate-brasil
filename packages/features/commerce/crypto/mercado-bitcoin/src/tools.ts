import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { get_tickerSchema, get_orderbookSchema } from "./schemas.js";
import { MercadoBitcoinClient } from "./client.js";

export const mercado_bitcoin_get_ticker = defineTool({
  name: "mercado_bitcoin_get_ticker",
  description: "Get current price ticker for a symbol",
  descriptionPt: "Busca ticker de preço atual de um símbolo",
  inputSchema: get_tickerSchema,
  discovery: {
    tags: ["crypto","bitcoin","exchange","trading","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new MercadoBitcoinClient(context.env);
    return client.get_ticker(input);
  },
});

export const mercado_bitcoin_get_orderbook = defineTool({
  name: "mercado_bitcoin_get_orderbook",
  description: "Get order book for a symbol",
  descriptionPt: "Busca livro de ofertas de um símbolo",
  inputSchema: get_orderbookSchema,
  discovery: {
    tags: ["crypto","bitcoin","exchange","trading","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new MercadoBitcoinClient(context.env);
    return client.get_orderbook(input);
  },
});

export const mercado_bitcoin_list_balances = defineTool({
  name: "mercado_bitcoin_list_balances",
  description: "List account balances",
  descriptionPt: "Lista saldos da conta",
  inputSchema: z.object({}),
  discovery: {
    tags: ["crypto","bitcoin","exchange","trading","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new MercadoBitcoinClient(context.env);
    return client.list_balances(input);
  },
});

export const tools = [mercado_bitcoin_get_ticker, mercado_bitcoin_get_orderbook, mercado_bitcoin_list_balances];
