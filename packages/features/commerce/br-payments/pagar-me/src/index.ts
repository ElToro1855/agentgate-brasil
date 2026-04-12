import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "pagar-me",
  name: "PagarMe",
  category: "commerce",
  subcategory: "br-payments",
  description: "Brazilian payment platform — charges, subscriptions, recipients, split payments",
  descriptionPt: "Plataforma de pagamentos brasileira — cobranças, assinaturas, recebedores, split",
  auth: {
    required: true,
    type: "basic",
    envVars: ["PAGARME_API_KEY"],
  },
  governance: {
    enabled: true,
    governedTools: ["pagar_me_create_charge"],
  },
  tools,
  discovery: {
    tags: ["payments","pix","credit-card","boleto","split","brazil"],
    keywords: [],
  },
  tags: ["payments","pix","credit-card","boleto","split","brazil"],
  status: "beta",
};
