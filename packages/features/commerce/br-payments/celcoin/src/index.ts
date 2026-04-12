import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "celcoin",
  name: "Celcoin",
  category: "commerce",
  subcategory: "br-payments",
  description: "Celcoin — banking as a service, Pix, bill payments, mobile top-up",
  descriptionPt: "Celcoin — banking as a service, Pix, pagamento de contas, recarga de celular",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["CELCOIN_CLIENT_ID","CELCOIN_CLIENT_SECRET"],
  },
  governance: {
    enabled: true,
    governedTools: ["celcoin_create_pix_transfer"],
  },
  tools,
  discovery: {
    tags: ["payments","pix","baas","bill-payment","brazil"],
    keywords: [],
  },
  tags: ["payments","pix","baas","bill-payment","brazil"],
  status: "beta",
};
