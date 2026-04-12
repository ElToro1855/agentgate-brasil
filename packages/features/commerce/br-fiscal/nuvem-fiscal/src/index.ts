import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "nuvem-fiscal",
  name: "NuvemFiscal",
  category: "commerce",
  subcategory: "br-fiscal",
  description: "Brazilian electronic invoicing — NFe, NFCe, NFSe issuance and management",
  descriptionPt: "Emissão de notas fiscais eletrônicas — NFe, NFCe, NFSe",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["NUVEM_FISCAL_API_KEY"],
  },
  governance: {
    enabled: true,
    governedTools: ["nuvem_fiscal_create_nfe"],
  },
  tools,
  discovery: {
    tags: ["fiscal","nfe","invoice","tax","brazil"],
    keywords: [],
  },
  tags: ["fiscal","nfe","invoice","tax","brazil"],
  status: "beta",
};
