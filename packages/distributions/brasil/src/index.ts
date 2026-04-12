/**
 * @agentgate/brasil — the complete AgentGate Brasil MCP server.
 *
 * Includes all features: commerce, data, consumer, protocols, and meta-agents.
 * Run as: npx @agentgate/brasil
 */

export { FeatureRegistry, createAgentGateServer } from "@agentgate/framework";
export type { FeatureMeta, GovernanceConfig } from "@agentgate/framework";
export { ToolDiscovery } from "@agentgate/discovery";
export { createMetaTools } from "@agentgate/meta-tools";
export { withGovernance, GovernanceClient } from "@agentgate/governance";
