import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "portal-transparencia",
  name: "PortalTransparencia",
  category: "data",
  subcategory: "transparency",
  description: "Federal Transparency Portal — government spending, contracts, salaries, grants",
  descriptionPt: "Portal da Transparência — gastos do governo, contratos, salários, convênios",
  auth: {
    required: true,
    type: "api_key",
    envVars: ["TRANSPARENCIA_API_KEY"],
  },
  governance: {
    enabled: false,
    governedTools: [],
  },
  tools,
  discovery: {
    tags: ["transparency", "spending", "government", "contracts", "brazil"],
    keywords: [],
  },
  tags: ["transparency", "spending", "government", "contracts", "brazil"],
  status: "beta",
};
