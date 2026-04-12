import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "ebanx",
  name: "EBANX",
  category: "commerce",
  subcategory: "br-payments",
  description: "EBANX — cross-border payments for LatAm, Pix, boleto, cards",
  descriptionPt: "EBANX — pagamentos cross-border para LatAm, Pix, boleto, cartões",
  auth: {
    required: true,
    type: "api_key",
    envVars: ["EBANX_INTEGRATION_KEY"],
  },
  governance: {
    enabled: true,
    governedTools: ["ebanx_create_payment"],
  },
  tools,
  discovery: {
    tags: ["payments","cross-border","pix","brazil","latam"],
    keywords: [],
  },
  tags: ["payments","cross-border","pix","brazil","latam"],
  status: "beta",
};
