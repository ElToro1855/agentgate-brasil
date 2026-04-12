import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "diario-oficial",
  name: "DiarioOficial",
  category: "data",
  subcategory: "legislative",
  description: "Brazilian Official Gazette (DOU) — search publications, acts, regulations",
  descriptionPt: "Diário Oficial da União (DOU) — busca de publicações, atos, regulamentos",
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
    tags: ["diario-oficial","dou","legislation","gazette","brazil","free"],
    keywords: [],
  },
  tags: ["diario-oficial","dou","legislation","gazette","brazil","free"],
  status: "beta",
};
