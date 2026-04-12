import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "tse",
  name: "TSE",
  category: "data",
  subcategory: "electoral",
  description: "Brazilian Electoral Court — candidates, elections, campaign finance",
  descriptionPt: "Tribunal Superior Eleitoral — candidatos, eleições, financiamento de campanha",
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
    tags: ["tse","elections","candidates","campaign","brazil","free"],
    keywords: [],
  },
  tags: ["tse","elections","candidates","campaign","brazil","free"],
  status: "beta",
};
