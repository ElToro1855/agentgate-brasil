import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import { FeatureRegistry } from "./registry.js";
import type { Tool, ToolContext, GovernanceConfig } from "./types.js";
import { createLogger } from "./logger.js";

export interface AgentGateServerConfig {
  name: string;
  version: string;
  registry: FeatureRegistry;
  filter?: {
    include?: string[];
    exclude?: string[];
    category?: string;
  };
  governanceConfig?: GovernanceConfig;
}

export interface AgentGateServer {
  registry: FeatureRegistry;
  start: () => Promise<void>;
}

export function createAgentGateServer(config: AgentGateServerConfig): AgentGateServer {
  const logger = createLogger(config.name);

  const features = config.filter
    ? config.registry.filterFeatures(config.filter)
    : config.registry.getAllFeatures();

  const toolMap = new Map<string, Tool>();
  for (const feature of features) {
    for (const tool of feature.tools) {
      toolMap.set(tool.name, tool);
    }
  }

  const server = new Server(
    { name: config.name, version: config.version },
    { capabilities: { tools: {} } },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: Array.from(toolMap.values()).map((tool) => ({
        name: tool.name,
        description: tool.description,
        inputSchema: zodToJsonSchema(tool.inputSchema) as Record<string, unknown>,
      })),
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const tool = toolMap.get(request.params.name);
    if (!tool) {
      throw new Error(`Tool not found: ${request.params.name}`);
    }

    const context: ToolContext = {
      env: process.env as Record<string, string | undefined>,
      governanceConfig: config.governanceConfig,
      logger,
    };

    try {
      const parsed = tool.inputSchema.parse(request.params.arguments);
      const result = await tool.handler(parsed, context);

      return {
        content: [
          {
            type: "text" as const,
            text: typeof result === "string" ? result : JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      logger.error("Tool execution failed", { tool: tool.name, error: message });
      return {
        content: [{ type: "text" as const, text: `Error: ${message}` }],
        isError: true,
      };
    }
  });

  return {
    registry: config.registry,
    start: async () => {
      const transport = new StdioServerTransport();
      await server.connect(transport);
      logger.info("Server started", {
        features: features.length,
        tools: toolMap.size,
      });
    },
  };
}
