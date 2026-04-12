import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "brasil-api",
  name: "BrasilAPI",
  category: "data",
  subcategory: "identity",
  description: "Brazilian public data API — CEP, CNPJ, banks, holidays, FIPE vehicle prices, area codes (no auth required)",
  descriptionPt: "API de dados públicos brasileiros — CEP, CNPJ, bancos, feriados, tabela FIPE, DDDs (sem autenticação)",
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
    tags: ["cep","cnpj","brazil","identity","banks","free"],
    keywords: [],
  },
  tags: ["cep","cnpj","brazil","identity","banks","free"],
  status: "ga",
};
