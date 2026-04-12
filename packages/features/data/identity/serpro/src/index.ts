import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "serpro",
  name: "SERPRO",
  category: "data",
  subcategory: "identity",
  description: "SERPRO — official government data services, CPF validation, CNPJ details",
  descriptionPt: "SERPRO — serviços oficiais de dados do governo, validação de CPF, detalhes de CNPJ",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["SERPRO_API_KEY"],
  },
  governance: {
    enabled: false,
    governedTools: [],
  },
  tools,
  discovery: {
    tags: ["serpro", "cpf", "cnpj", "government", "identity", "brazil"],
    keywords: [],
  },
  tags: ["serpro", "cpf", "cnpj", "government", "identity", "brazil"],
  status: "beta",
};
