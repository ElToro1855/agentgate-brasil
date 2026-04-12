import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "cielo",
  name: "Cielo",
  category: "commerce",
  subcategory: "br-payments",
  description: "Cielo — credit/debit card processing, tokenization",
  descriptionPt: "Cielo — processamento de cartões crédito/débito, tokenização",
  auth: {
    required: true,
    type: "api_key",
    envVars: ["CIELO_MERCHANT_ID","CIELO_MERCHANT_KEY"],
  },
  governance: {
    enabled: true,
    governedTools: ["cielo_create_sale"],
  },
  tools,
  discovery: {
    tags: ["payments","credit-card","debit-card","cielo","brazil"],
    keywords: [],
  },
  tags: ["payments","credit-card","debit-card","cielo","brazil"],
  status: "beta",
};
