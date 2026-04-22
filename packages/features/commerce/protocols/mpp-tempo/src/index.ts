import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "mpp-tempo",
  name: "MPP + PIX (Tempo)",
  category: "commerce",
  subcategory: "protocols",
  description:
    "Machine Payments Protocol on Tempo — AI agents settle pathUSD and trigger PIX payouts to any Brazilian bank account via OZAV's regulated LatAm corridor",
  descriptionPt:
    "Machine Payments Protocol na Tempo — agentes IA liquidam pathUSD e disparam PIX para qualquer conta bancária brasileira via corredor regulado LatAm da OZAV",
  auth: {
    required: false,
    type: "bearer",
    envVars: ["AGENTGATE_API_KEY", "AGENTGATE_API_URL"],
  },
  governance: {
    enabled: true,
    governedTools: ["mpp_tempo_create_pix_payout"],
  },
  tools,
  discovery: {
    tags: [
      "mpp",
      "tempo",
      "pix",
      "brazil",
      "latam",
      "stablecoin",
      "agentic",
      "payment",
      "ozav",
    ],
    keywords: [
      "send pix",
      "transfer brl",
      "pagar pix",
      "mpp tempo",
      "agent payment",
      "stablecoin to pix",
      "cross-border agent payment",
    ],
  },
  tags: ["mpp", "tempo", "pix", "agentic", "latam"],
  status: "beta",
};

export { tools } from "./tools.js";
export { MppTempoClient } from "./client.js";
export { SANDBOX_API_KEY, DEFAULT_API_URL } from "./constants.js";
