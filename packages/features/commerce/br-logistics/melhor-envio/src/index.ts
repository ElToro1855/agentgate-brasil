import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "melhor-envio",
  name: "MelhorEnvio",
  category: "commerce",
  subcategory: "br-logistics",
  description: "Brazilian shipping aggregator — freight quotes, label generation, tracking across carriers",
  descriptionPt: "Agregador de fretes brasileiro — cotações, geração de etiquetas, rastreamento multi-transportadora",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["MELHOR_ENVIO_TOKEN"],
  },
  governance: {
    enabled: false,
    governedTools: [],
  },
  tools,
  discovery: {
    tags: ["shipping","logistics","freight","tracking","brazil"],
    keywords: [],
  },
  tags: ["shipping","logistics","freight","tracking","brazil"],
  status: "beta",
};
