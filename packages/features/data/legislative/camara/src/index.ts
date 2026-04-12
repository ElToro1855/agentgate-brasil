import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "camara",
  name: "Câmara dos Deputados",
  category: "data",
  subcategory: "legislative",
  description: "Brazilian House of Representatives — deputies, proposals, votes, expenses (no auth)",
  descriptionPt: "Câmara dos Deputados — deputados, proposições, votações, despesas (sem autenticação)",
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
    tags: ["camara","deputies","legislation","votes","expenses","government","brazil","free"],
    keywords: [],
  },
  tags: ["camara","deputies","legislation","votes","expenses","government","brazil","free"],
  status: "ga",
};
