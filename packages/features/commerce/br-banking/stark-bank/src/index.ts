import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "stark-bank",
  name: "StarkBank",
  category: "commerce",
  subcategory: "br-banking",
  description: "Brazilian digital banking API — transfers, boletos, Pix, balance",
  descriptionPt: "API bancária digital brasileira — transferências, boletos, Pix, saldo",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["STARK_BANK_API_KEY"],
  },
  governance: {
    enabled: true,
    governedTools: ["stark_bank_create_transfer","stark_bank_create_boleto"],
  },
  tools,
  discovery: {
    tags: ["banking","pix","transfer","boleto","brazil"],
    keywords: [],
  },
  tags: ["banking","pix","transfer","boleto","brazil"],
  status: "beta",
};
