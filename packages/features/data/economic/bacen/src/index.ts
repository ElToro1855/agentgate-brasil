import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "bacen",
  name: "BACEN",
  category: "data",
  subcategory: "economic",
  description: "Brazilian Central Bank API — Selic rate, IPCA inflation, exchange rates, 40K+ time series (no auth)",
  descriptionPt: "API do Banco Central — taxa Selic, IPCA, câmbio, 40K+ séries temporais (sem autenticação)",
  auth: {
    required: false,
    type: "none",
    envVars: [],
  },
  governance: {
    enabled: false,
    governedTools: [],
  },
  tools,
  discovery: {
    tags: ["bacen","selic","ipca","exchange-rate","economic","brazil","free"],
    keywords: [],
  },
  tags: ["bacen","selic","ipca","exchange-rate","economic","brazil","free"],
  status: "ga",
};
