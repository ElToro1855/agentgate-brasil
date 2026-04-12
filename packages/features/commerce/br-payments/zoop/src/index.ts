import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "zoop",
  name: "Zoop",
  category: "commerce",
  subcategory: "br-payments",
  description: "Brazilian marketplace payment processor — Pix, credit card, boleto, split payments",
  descriptionPt: "Processador de pagamentos brasileiro para marketplaces — Pix, cartão de crédito, boleto, split",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["ZOOP_API_KEY"],
  },
  governance: {
    enabled: true,
    governedTools: ["zoop_create_pix_transaction","zoop_create_card_transaction","zoop_refund_transaction"],
  },
  tools,
  discovery: {
    tags: ["payments","pix","marketplace","split","brazil"],
    keywords: [],
  },
  tags: ["payments","pix","marketplace","split","brazil"],
  status: "beta",
};
