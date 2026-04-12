import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "vindi",
  name: "Vindi",
  category: "commerce",
  subcategory: "br-payments",
  description: "Vindi — recurring billing, subscriptions, payment management",
  descriptionPt: "Vindi — cobrança recorrente, assinaturas, gestão de pagamentos",
  auth: {
    required: true,
    type: "basic",
    envVars: ["VINDI_API_KEY"],
  },
  governance: {
    enabled: true,
    governedTools: ["vindi_create_bill"],
  },
  tools,
  discovery: {
    tags: ["payments","subscriptions","recurring","billing","brazil"],
    keywords: [],
  },
  tags: ["payments","subscriptions","recurring","billing","brazil"],
  status: "beta",
};
