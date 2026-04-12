import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "focus-nfe",
  name: "FocusNFe",
  category: "commerce",
  subcategory: "br-fiscal",
  description: "Focus NFe — electronic invoice issuance (NFe, NFCe, NFSe)",
  descriptionPt: "Focus NFe — emissão de notas fiscais eletrônicas (NFe, NFCe, NFSe)",
  auth: {
    required: true,
    type: "basic",
    envVars: ["FOCUS_NFE_TOKEN"],
  },
  governance: {
    enabled: true,
    governedTools: ["focus_nfe_create_nfe"],
  },
  tools,
  discovery: {
    tags: ["fiscal","nfe","invoice","tax","brazil"],
    keywords: [],
  },
  tags: ["fiscal","nfe","invoice","tax","brazil"],
  status: "beta",
};
