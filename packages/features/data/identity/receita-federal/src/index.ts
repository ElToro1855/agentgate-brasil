import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "receita-federal",
  name: "ReceitaFederal",
  category: "data",
  subcategory: "identity",
  description: "Brazilian Federal Revenue Service — detailed CNPJ/CPF data, tax status",
  descriptionPt: "Receita Federal — dados detalhados de CNPJ/CPF, situação fiscal",
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
    tags: ["receita-federal", "cnpj", "cpf", "tax", "identity", "brazil", "free"],
    keywords: [],
  },
  tags: ["receita-federal", "cnpj", "cpf", "tax", "identity", "brazil", "free"],
  status: "beta",
};
