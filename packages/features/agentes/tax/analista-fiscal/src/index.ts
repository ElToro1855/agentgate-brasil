import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "analista-fiscal",
  name: "AnalistaFiscal",
  category: "agentes",
  subcategory: "tax",
  description: "Tax analysis agent — Simples Nacional calculation, tax regime comparison, DRE generation",
  descriptionPt: "Agente de análise fiscal — cálculo Simples Nacional, comparação de regimes, geração de DRE",
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
    tags: ["agent","tax","fiscal","simples-nacional","dre","brazil"],
    keywords: [],
  },
  tags: ["agent","tax","fiscal","simples-nacional","dre","brazil"],
  status: "alpha",
};
