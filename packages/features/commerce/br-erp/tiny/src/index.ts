import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "tiny",
  name: "Tiny",
  category: "commerce",
  subcategory: "br-erp",
  description: "Tiny ERP — simple ERP for e-commerce, products, orders, invoicing",
  descriptionPt: "Tiny ERP — ERP simples para e-commerce, produtos, pedidos, faturamento",
  auth: {
    required: true,
    type: "api_key",
    envVars: ["TINY_API_TOKEN"],
  },
  governance: {
    enabled: false,
    governedTools: [],
  },
  tools,
  discovery: {
    tags: ["erp","ecommerce","products","orders","brazil"],
    keywords: [],
  },
  tags: ["erp","ecommerce","products","orders","brazil"],
  status: "beta",
};
