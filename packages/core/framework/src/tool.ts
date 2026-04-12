import type { Tool, ToolDiscovery, ToolHandler } from "./types.js";
import type { z } from "zod";

export function defineTool<TInput, TOutput>(config: {
  name: string;
  description: string;
  descriptionPt?: string;
  inputSchema: z.ZodType<TInput>;
  discovery?: ToolDiscovery;
  handler: ToolHandler<TInput, TOutput>;
}): Tool<TInput, TOutput> {
  return {
    name: config.name,
    description: config.description,
    descriptionPt: config.descriptionPt,
    inputSchema: config.inputSchema,
    discovery: config.discovery,
    handler: config.handler,
  };
}
