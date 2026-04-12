import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "bling",
  name: "Bling",
  category: "commerce",
  subcategory: "br-erp",
  description: "Bling ERP — products, orders, invoicing, inventory management",
  descriptionPt: "Bling ERP — produtos, pedidos, faturamento, gestão de estoque",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["BLING_API_KEY"],
  },
  governance: {
    enabled: false,
    governedTools: [],
  },
  tools,
  discovery: {
    tags: ["erp","products","orders","inventory","brazil"],
    keywords: [],
  },
  tags: ["erp","products","orders","inventory","brazil"],
  status: "beta",
};
