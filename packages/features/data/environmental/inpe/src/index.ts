import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "inpe",
  name: "INPE",
  category: "data",
  subcategory: "environmental",
  description: "Brazilian space research — fires, deforestation alerts, satellite data",
  descriptionPt: "Instituto Nacional de Pesquisas Espaciais — queimadas, alertas de desmatamento, dados de satélite",
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
    tags: ["inpe","fires","deforestation","satellite","environment","brazil","free"],
    keywords: [],
  },
  tags: ["inpe","fires","deforestation","satellite","environment","brazil","free"],
  status: "beta",
};
