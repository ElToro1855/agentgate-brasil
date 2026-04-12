import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { get_seriesSchema, get_series_lastSchema } from "./schemas.js";
import { BACENClient } from "./client.js";

export const bacen_get_series = defineTool({
  name: "bacen_get_series",
  description: "Get time series data from BACEN by series code",
  descriptionPt: "Busca dados de série temporal do BACEN por código",
  inputSchema: get_seriesSchema,
  discovery: {
    tags: ["bacen","selic","ipca","exchange-rate","economic","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new BACENClient(context.env);
    return client.get_series(input);
  },
});

export const bacen_get_series_last = defineTool({
  name: "bacen_get_series_last",
  description: "Get the last N values of a BACEN time series",
  descriptionPt: "Busca os últimos N valores de uma série temporal do BACEN",
  inputSchema: get_series_lastSchema,
  discovery: {
    tags: ["bacen","selic","ipca","exchange-rate","economic","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new BACENClient(context.env);
    return client.get_series_last(input);
  },
});

export const bacen_get_selic = defineTool({
  name: "bacen_get_selic",
  description: "Get current Selic interest rate (shortcut for series 432)",
  descriptionPt: "Busca taxa Selic atual (atalho para série 432)",
  inputSchema: z.object({}),
  discovery: {
    tags: ["bacen","selic","ipca","exchange-rate","economic","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new BACENClient(context.env);
    return client.get_selic(input);
  },
});

export const bacen_get_ipca = defineTool({
  name: "bacen_get_ipca",
  description: "Get latest IPCA inflation index (shortcut for series 433)",
  descriptionPt: "Busca último índice IPCA de inflação (atalho para série 433)",
  inputSchema: z.object({}),
  discovery: {
    tags: ["bacen","selic","ipca","exchange-rate","economic","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new BACENClient(context.env);
    return client.get_ipca(input);
  },
});

export const bacen_get_usd_brl = defineTool({
  name: "bacen_get_usd_brl",
  description: "Get latest USD/BRL exchange rate (shortcut for series 1)",
  descriptionPt: "Busca última cotação USD/BRL (atalho para série 1)",
  inputSchema: z.object({}),
  discovery: {
    tags: ["bacen","selic","ipca","exchange-rate","economic","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new BACENClient(context.env);
    return client.get_usd_brl(input);
  },
});

export const bacen_get_eur_brl = defineTool({
  name: "bacen_get_eur_brl",
  description: "Get latest EUR/BRL exchange rate (shortcut for series 21619)",
  descriptionPt: "Busca última cotação EUR/BRL (atalho para série 21619)",
  inputSchema: z.object({}),
  discovery: {
    tags: ["bacen","selic","ipca","exchange-rate","economic","brazil","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new BACENClient(context.env);
    return client.get_eur_brl(input);
  },
});

export const tools = [bacen_get_series, bacen_get_series_last, bacen_get_selic, bacen_get_ipca, bacen_get_usd_brl, bacen_get_eur_brl];
