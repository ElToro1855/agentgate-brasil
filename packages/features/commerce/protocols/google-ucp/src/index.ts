import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "google-ucp",
  name: "GoogleUCP",
  category: "commerce",
  subcategory: "protocols",
  description: "Google Universal Commerce Protocol — standardized product search, compare, purchase across merchants",
  descriptionPt: "Google Universal Commerce Protocol — busca, comparação e compra de produtos padronizada entre comerciantes",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["GOOGLE_UCP_API_KEY"],
  },
  governance: {
    enabled: true,
    governedTools: ["google_ucp_purchase"],
  },
  tools,
  discovery: {
    tags: ["google","ucp","commerce","shopping","products"],
    keywords: [],
  },
  tags: ["google","ucp","commerce","shopping","products"],
  status: "alpha",
};
