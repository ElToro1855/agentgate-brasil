import { defineTool } from "@agentgate/framework";
import { search_processesSchema, get_processSchema } from "./schemas.js";
import { DataJudClient } from "./client.js";

export const datajud_search_processes = defineTool({
  name: "datajud_search_processes",
  description: "Search judicial processes by party name or number",
  descriptionPt: "Busca processos judiciais por nome da parte ou número",
  inputSchema: search_processesSchema,
  discovery: {
    tags: ["datajud", "judicial", "courts", "lawsuits", "brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new DataJudClient(context.env);
    return client.search_processes(input);
  },
});

export const datajud_get_process = defineTool({
  name: "datajud_get_process",
  description: "Get process details by unified number (NPU)",
  descriptionPt: "Busca detalhes de processo por número unificado (NPU)",
  inputSchema: get_processSchema,
  discovery: {
    tags: ["datajud", "judicial", "courts", "lawsuits", "brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new DataJudClient(context.env);
    return client.get_process(input);
  },
});

export const tools = [datajud_search_processes, datajud_get_process];
