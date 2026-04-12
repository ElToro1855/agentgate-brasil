import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "senado",
  name: "Senado Federal",
  category: "data",
  subcategory: "legislative",
  description: "Brazilian Federal Senate — senators, matters, votes, committees (no auth)",
  descriptionPt: "Senado Federal — senadores, matérias, votações, comissões (sem autenticação)",
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
    tags: ["senado","senate","senators","legislation","government","brazil","free"],
    keywords: [],
  },
  tags: ["senado","senate","senators","legislation","government","brazil","free"],
  status: "ga",
};
