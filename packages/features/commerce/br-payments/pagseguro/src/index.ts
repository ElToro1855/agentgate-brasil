import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "pagseguro",
  name: "PagSeguro",
  category: "commerce",
  subcategory: "br-payments",
  description: "PagBank/PagSeguro — charges, Pix, boleto, card tokenization",
  descriptionPt: "PagBank/PagSeguro — cobranças, Pix, boleto, tokenização de cartão",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["PAGSEGURO_TOKEN"],
  },
  governance: {
    enabled: true,
    governedTools: ["pagseguro_create_charge"],
  },
  tools,
  discovery: {
    tags: ["payments","pix","boleto","credit-card","brazil"],
    keywords: [],
  },
  tags: ["payments","pix","boleto","credit-card","brazil"],
  status: "beta",
};
