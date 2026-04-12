import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "datasus",
  name: "DataSUS",
  category: "data",
  subcategory: "health",
  description: "Brazilian public health data — hospitalizations, mortality, epidemiology",
  descriptionPt: "Dados de saúde pública brasileira — internações, mortalidade, epidemiologia",
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
    tags: ["datasus", "health", "epidemiology", "mortality", "hospitals", "brazil", "free"],
    keywords: [],
  },
  tags: ["datasus", "health", "epidemiology", "mortality", "hospitals", "brazil", "free"],
  status: "alpha",
};
