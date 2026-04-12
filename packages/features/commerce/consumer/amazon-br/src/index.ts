import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "amazon-br",
  name: "AmazonBR",
  category: "commerce",
  subcategory: "consumer",
  description: "Amazon Brazil — product search, reviews, pricing via Product Advertising API",
  descriptionPt: "Amazon Brasil — busca de produtos, avaliações, preços via Product Advertising API",
  auth: {
    required: true,
    type: "api_key",
    envVars: ["AMAZON_ACCESS_KEY","AMAZON_SECRET_KEY","AMAZON_PARTNER_TAG"],
  },
  governance: {
    enabled: false,
    governedTools: [],
  },
  tools,
  discovery: {
    tags: ["amazon","shopping","products","reviews","brazil","consumer"],
    keywords: [],
  },
  tags: ["amazon","shopping","products","reviews","brazil","consumer"],
  status: "alpha",
};
