import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "open-finance",
  name: "OpenFinance",
  category: "commerce",
  subcategory: "br-banking",
  description: "Brazilian Open Finance — account data, payments, consents",
  descriptionPt: "Open Finance Brasil — dados de conta, pagamentos, consentimentos",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["OPEN_FINANCE_TOKEN"],
  },
  governance: {
    enabled: false,
    governedTools: [],
  },
  tools,
  discovery: {
    tags: ["open-banking","open-finance","banking","pix","brazil"],
    keywords: [],
  },
  tags: ["open-banking","open-finance","banking","pix","brazil"],
  status: "alpha",
};
