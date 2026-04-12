import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { create_pix_chargeSchema, get_pix_chargeSchema, create_pix_qrcodeSchema } from "./schemas.js";
import { EFIClient } from "./client.js";

export const efi_create_pix_charge = defineTool({
  name: "efi_create_pix_charge",
  description: "Create a Pix charge (cobrança imediata)",
  descriptionPt: "Cria uma cobrança Pix imediata",
  inputSchema: create_pix_chargeSchema,
  discovery: {
    tags: ["payments","pix","boleto","gerencianet","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new EFIClient(context.env);
    return client.create_pix_charge(input);
  },
});

export const efi_get_pix_charge = defineTool({
  name: "efi_get_pix_charge",
  description: "Get Pix charge details",
  descriptionPt: "Busca detalhes de cobrança Pix",
  inputSchema: get_pix_chargeSchema,
  discovery: {
    tags: ["payments","pix","boleto","gerencianet","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new EFIClient(context.env);
    return client.get_pix_charge(input);
  },
});

export const efi_create_pix_qrcode = defineTool({
  name: "efi_create_pix_qrcode",
  description: "Generate QR code for a Pix charge",
  descriptionPt: "Gera QR code para cobrança Pix",
  inputSchema: create_pix_qrcodeSchema,
  discovery: {
    tags: ["payments","pix","boleto","gerencianet","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new EFIClient(context.env);
    return client.create_pix_qrcode(input);
  },
});

export const tools = [efi_create_pix_charge, efi_get_pix_charge, efi_create_pix_qrcode];
