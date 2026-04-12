import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "omie",
  name: "Omie",
  category: "commerce",
  subcategory: "br-erp",
  description: "Brazilian ERP system — customers, invoices, products, financial",
  descriptionPt: "Sistema ERP brasileiro — clientes, notas fiscais, produtos, financeiro",
  auth: {
    required: true,
    type: "api_key",
    envVars: ["OMIE_APP_KEY","OMIE_APP_SECRET"],
  },
  governance: {
    enabled: false,
    governedTools: [],
  },
  tools,
  discovery: {
    tags: ["erp","invoicing","products","financial","brazil"],
    keywords: [],
  },
  tags: ["erp","invoicing","products","financial","brazil"],
  status: "beta",
};
