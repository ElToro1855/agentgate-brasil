import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "google-ap2",
  name: "GoogleAP2",
  category: "commerce",
  subcategory: "protocols",
  description: "Google Agent Payments Protocol v2 — HMAC-mandated agent-to-merchant payments",
  descriptionPt: "Google Agent Payments Protocol v2 — pagamentos mandatados por HMAC de agente para comerciante",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["GOOGLE_AP2_API_KEY"],
  },
  governance: {
    enabled: true,
    governedTools: ["google_ap2_create_mandate","google_ap2_execute_payment"],
  },
  tools,
  discovery: {
    tags: ["google","ap2","agent-payments","hmac","commerce"],
    keywords: [],
  },
  tags: ["google","ap2","agent-payments","hmac","commerce"],
  status: "alpha",
};
