import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "ana",
  name: "ANA",
  category: "data",
  subcategory: "environmental",
  description: "National Water Agency — water resources, reservoirs, river flow data",
  descriptionPt: "Agência Nacional de Águas — recursos hídricos, reservatórios, vazão de rios",
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
    tags: ["ana", "water", "reservoirs", "rivers", "environment", "brazil", "free"],
    keywords: [],
  },
  tags: ["ana", "water", "reservoirs", "rivers", "environment", "brazil", "free"],
  status: "alpha",
};
