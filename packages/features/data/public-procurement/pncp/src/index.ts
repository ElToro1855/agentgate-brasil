import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "pncp",
  name: "PNCP",
  category: "data",
  subcategory: "public-procurement",
  description: "Brazilian public procurement portal — government contracts, bids, awards",
  descriptionPt: "Portal Nacional de Contratações Públicas — contratos, licitações, adjudicações",
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
    tags: ["pncp","procurement","government","contracts","bids","brazil","free"],
    keywords: [],
  },
  tags: ["pncp","procurement","government","contracts","bids","brazil","free"],
  status: "beta",
};
