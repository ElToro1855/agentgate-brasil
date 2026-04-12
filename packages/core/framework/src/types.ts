import type { z } from "zod";

export interface ToolDiscovery {
  tags: string[];
  keywords: string[];
}

export interface Tool<TInput = any, TOutput = any> {
  name: string;
  description: string;
  descriptionPt?: string;
  inputSchema: z.ZodType<TInput>;
  discovery?: ToolDiscovery;
  handler: ToolHandler<TInput, TOutput>;
}

export interface ToolContext {
  env: Record<string, string | undefined>;
  governanceConfig?: GovernanceConfig;
  logger: Logger;
}

export type ToolHandler<TInput = any, TOutput = any> = (
  input: TInput,
  context: ToolContext,
) => Promise<TOutput>;

export interface FeatureAuth {
  required: boolean;
  type: "bearer" | "basic" | "api_key" | "oauth2" | "none";
  envVars: string[];
}

export interface FeatureGovernance {
  enabled: boolean;
  governedTools: string[];
}

export interface FeatureMeta {
  id: string;
  name: string;
  category: "commerce" | "data" | "agentes";
  subcategory: string;
  description: string;
  descriptionPt: string;
  auth: FeatureAuth;
  governance: FeatureGovernance;
  tools: Tool[];
  discovery: ToolDiscovery;
  tags: string[];
  status: "ga" | "beta" | "alpha" | "deprecated";
}

export interface GovernanceConfig {
  apiKey: string;
  apiUrl: string;
}

export interface Logger {
  info: (message: string, data?: Record<string, unknown>) => void;
  warn: (message: string, data?: Record<string, unknown>) => void;
  error: (message: string, data?: Record<string, unknown>) => void;
  debug: (message: string, data?: Record<string, unknown>) => void;
}
