import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "vtex",
  name: "VTEX",
  category: "commerce",
  subcategory: "br-logistics",
  description: "VTEX e-commerce platform — orders, products, inventory, fulfillment",
  descriptionPt: "Plataforma e-commerce VTEX — pedidos, produtos, estoque, fulfillment",
  auth: {
    required: true,
    type: "api_key",
    envVars: ["VTEX_APP_KEY","VTEX_APP_TOKEN"],
  },
  governance: {
    enabled: false,
    governedTools: [],
  },
  tools,
  discovery: {
    tags: ["ecommerce","orders","products","inventory","brazil"],
    keywords: [],
  },
  tags: ["ecommerce","orders","products","inventory","brazil"],
  status: "beta",
};
