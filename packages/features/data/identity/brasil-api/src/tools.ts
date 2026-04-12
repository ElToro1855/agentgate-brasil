import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { get_cepSchema, get_cnpjSchema, get_bankSchema, list_holidaysSchema, get_dddSchema, get_fipeSchema, list_fipe_brandsSchema } from "./schemas.js";
import { BrasilAPIClient } from "./client.js";

export const brasil_api_get_cep = defineTool({
  name: "brasil_api_get_cep",
  description: "Look up address by Brazilian ZIP code (CEP)",
  descriptionPt: "Busca endereço por CEP",
  inputSchema: get_cepSchema,
  discovery: {
    tags: ["cep","cnpj","brazil","identity","banks","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new BrasilAPIClient(context.env);
    return client.get_cep(input);
  },
});

export const brasil_api_get_cnpj = defineTool({
  name: "brasil_api_get_cnpj",
  description: "Look up company data by CNPJ number",
  descriptionPt: "Busca dados de empresa por CNPJ",
  inputSchema: get_cnpjSchema,
  discovery: {
    tags: ["cep","cnpj","brazil","identity","banks","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new BrasilAPIClient(context.env);
    return client.get_cnpj(input);
  },
});

export const brasil_api_list_banks = defineTool({
  name: "brasil_api_list_banks",
  description: "List all Brazilian banks with codes",
  descriptionPt: "Lista todos os bancos brasileiros com códigos",
  inputSchema: z.object({}),
  discovery: {
    tags: ["cep","cnpj","brazil","identity","banks","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new BrasilAPIClient(context.env);
    return client.list_banks(input);
  },
});

export const brasil_api_get_bank = defineTool({
  name: "brasil_api_get_bank",
  description: "Get bank details by code",
  descriptionPt: "Busca detalhes do banco por código",
  inputSchema: get_bankSchema,
  discovery: {
    tags: ["cep","cnpj","brazil","identity","banks","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new BrasilAPIClient(context.env);
    return client.get_bank(input);
  },
});

export const brasil_api_list_holidays = defineTool({
  name: "brasil_api_list_holidays",
  description: "List Brazilian national holidays for a given year",
  descriptionPt: "Lista feriados nacionais brasileiros para um dado ano",
  inputSchema: list_holidaysSchema,
  discovery: {
    tags: ["cep","cnpj","brazil","identity","banks","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new BrasilAPIClient(context.env);
    return client.list_holidays(input);
  },
});

export const brasil_api_get_ddd = defineTool({
  name: "brasil_api_get_ddd",
  description: "Get cities and state for a Brazilian area code (DDD)",
  descriptionPt: "Busca cidades e estado por código de área (DDD)",
  inputSchema: get_dddSchema,
  discovery: {
    tags: ["cep","cnpj","brazil","identity","banks","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new BrasilAPIClient(context.env);
    return client.get_ddd(input);
  },
});

export const brasil_api_get_fipe = defineTool({
  name: "brasil_api_get_fipe",
  description: "Search FIPE vehicle price table by reference code",
  descriptionPt: "Busca tabela FIPE de preços de veículos por código de referência",
  inputSchema: get_fipeSchema,
  discovery: {
    tags: ["cep","cnpj","brazil","identity","banks","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new BrasilAPIClient(context.env);
    return client.get_fipe(input);
  },
});

export const brasil_api_list_fipe_brands = defineTool({
  name: "brasil_api_list_fipe_brands",
  description: "List vehicle brands from FIPE table by vehicle type",
  descriptionPt: "Lista marcas de veículos da tabela FIPE por tipo",
  inputSchema: list_fipe_brandsSchema,
  discovery: {
    tags: ["cep","cnpj","brazil","identity","banks","free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new BrasilAPIClient(context.env);
    return client.list_fipe_brands(input);
  },
});

export const tools = [brasil_api_get_cep, brasil_api_get_cnpj, brasil_api_list_banks, brasil_api_get_bank, brasil_api_list_holidays, brasil_api_get_ddd, brasil_api_get_fipe, brasil_api_list_fipe_brands];
