import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "stripe-acp",
  name: "Stripe ACP",
  category: "commerce",
  subcategory: "protocols",
  description: "Stripe Agentic Commerce Protocol — create and manage payments for AI agent commerce",
  descriptionPt: "Stripe Agentic Commerce Protocol — crie e gerencie pagamentos para comércio de agentes IA",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["STRIPE_SECRET_KEY"],
  },
  governance: {
    enabled: true,
    governedTools: ["stripe_acp_create_payment_intent"],
  },
  tools,
  discovery: {
    tags: ["stripe", "acp", "payment", "commerce", "credit-card", "agentic"],
    keywords: ["stripe payment", "agentic commerce", "payment intent", "cobrar stripe"],
  },
  tags: ["stripe", "acp", "payment", "commerce"],
  status: "beta",
};

export { tools } from "./tools.js";
export { StripeAcpClient } from "./client.js";
