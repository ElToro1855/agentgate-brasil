import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "correios",
  name: "Correios",
  category: "commerce",
  subcategory: "br-logistics",
  description: "Brazilian postal service — tracking, shipping rates, CEP lookup",
  descriptionPt: "Correios — rastreamento, cálculo de frete, consulta de CEP",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["CORREIOS_TOKEN"],
  },
  governance: {
    enabled: false,
    governedTools: [],
  },
  tools,
  discovery: {
    tags: ["shipping","postal","tracking","logistics","brazil"],
    keywords: [],
  },
  tags: ["shipping","postal","tracking","logistics","brazil"],
  status: "beta",
};
