import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "conta-azul",
  name: "ContaAzul",
  category: "commerce",
  subcategory: "br-fiscal",
  description: "Conta Azul — accounting, invoicing, financial management for SMBs",
  descriptionPt: "Conta Azul — contabilidade, faturamento, gestão financeira para PMEs",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["CONTA_AZUL_TOKEN"],
  },
  governance: {
    enabled: false,
    governedTools: [],
  },
  tools,
  discovery: {
    tags: ["accounting","invoicing","financial","smb","brazil"],
    keywords: [],
  },
  tags: ["accounting","invoicing","financial","smb","brazil"],
  status: "beta",
};
