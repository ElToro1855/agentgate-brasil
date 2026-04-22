/**
 * Default endpoint for the AgentGate policy engine that issues mppx-signed
 * 402 challenges and verifies credentials on Tempo.
 *
 * Override via env `AGENTGATE_API_URL` for self-hosted deployments.
 */
export const DEFAULT_API_URL = "https://agentic-payments-sage.vercel.app";

/**
 * Public sandbox API key. No signup required. Routes to Tempo Moderato
 * testnet. Simulated PIX (SIM_* tx IDs). KYB + policy gates bypassed.
 * IP-rate-limited to 100 requests per hour.
 *
 * For production use, provision a key at the AgentGate dashboard and set
 * env `AGENTGATE_API_KEY`.
 */
export const SANDBOX_API_KEY = "ag_sandbox_demo_READONLY_00000000000000000";

/** Supported rails on the MPP bridge today. */
export const SUPPORTED_RAILS = ["pix"] as const;
export type SupportedRail = (typeof SUPPORTED_RAILS)[number];
