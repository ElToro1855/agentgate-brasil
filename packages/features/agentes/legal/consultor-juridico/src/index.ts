import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "consultor-juridico",
  name: "ConsultorJuridico",
  category: "agentes",
  subcategory: "legal",
  description: "Legal consultation agent — jurisprudence search, legal analysis, process tracking",
  descriptionPt: "Agente de consultoria jurídica — busca de jurisprudência, análise legal, acompanhamento processual",
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
    tags: ["agent","legal","jurisprudence","courts","law","brazil"],
    keywords: [],
  },
  tags: ["agent","legal","jurisprudence","courts","law","brazil"],
  status: "alpha",
};
