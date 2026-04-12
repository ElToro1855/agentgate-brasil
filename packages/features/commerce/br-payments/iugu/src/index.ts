import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "iugu",
  name: "Iugu",
  category: "commerce",
  subcategory: "br-payments",
  description: "Iugu — subscriptions, invoicing, marketplace splits",
  descriptionPt: "Iugu — assinaturas, faturamento, split de marketplace",
  auth: {
    required: true,
    type: "basic",
    envVars: ["IUGU_API_TOKEN"],
  },
  governance: {
    enabled: true,
    governedTools: ["iugu_create_invoice"],
  },
  tools,
  discovery: {
    tags: ["payments","subscriptions","invoicing","split","brazil"],
    keywords: [],
  },
  tags: ["payments","subscriptions","invoicing","split","brazil"],
  status: "beta",
};
