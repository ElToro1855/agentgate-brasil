import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { create_nfeSchema, get_nfeSchema } from "./schemas.js";
import { FocusNFeClient } from "./client.js";

export const focus_nfe_create_nfe = defineTool({
  name: "focus_nfe_create_nfe",
  description: "Issue an NFe",
  descriptionPt: "Emite uma NFe",
  inputSchema: create_nfeSchema,
  discovery: {
    tags: ["fiscal","nfe","invoice","tax","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new FocusNFeClient(context.env);
    return client.create_nfe(input);
  },
});

export const focus_nfe_get_nfe = defineTool({
  name: "focus_nfe_get_nfe",
  description: "Get NFe status",
  descriptionPt: "Consulta status de NFe",
  inputSchema: get_nfeSchema,
  discovery: {
    tags: ["fiscal","nfe","invoice","tax","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new FocusNFeClient(context.env);
    return client.get_nfe(input);
  },
});

export const tools = [focus_nfe_create_nfe, focus_nfe_get_nfe];
