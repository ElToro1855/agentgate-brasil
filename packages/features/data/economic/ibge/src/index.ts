import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "ibge",
  name: "IBGE",
  category: "data",
  subcategory: "economic",
  description: "Brazilian Institute of Geography and Statistics — population, states, municipalities, GDP (no auth)",
  descriptionPt: "Instituto Brasileiro de Geografia e Estatística — população, estados, municípios, PIB (sem autenticação)",
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
    tags: ["ibge","statistics","population","states","municipalities","brazil","free"],
    keywords: [],
  },
  tags: ["ibge","statistics","population","states","municipalities","brazil","free"],
  status: "ga",
};
