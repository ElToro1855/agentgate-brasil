import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "asaas",
  name: "Asaas",
  category: "commerce",
  subcategory: "br-payments",
  description: "Brazilian SMB payment platform — invoicing, Pix, boleto, subscriptions",
  descriptionPt: "Plataforma de pagamentos para PMEs — cobrança, Pix, boleto, assinaturas",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["ASAAS_API_KEY"],
  },
  governance: {
    enabled: true,
    governedTools: ["asaas_create_payment","asaas_create_subscription"],
  },
  tools,
  discovery: {
    tags: ["payments","pix","boleto","invoicing","subscriptions","brazil"],
    keywords: [],
  },
  tags: ["payments","pix","boleto","invoicing","subscriptions","brazil"],
  status: "beta",
};
