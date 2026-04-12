import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "jurisprudencia",
  name: "Jurisprudencia",
  category: "data",
  subcategory: "judicial",
  description: "Brazilian supreme court rulings — STF and STJ jurisprudence search",
  descriptionPt: "Jurisprudência dos tribunais superiores — busca STF e STJ",
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
    tags: ["jurisprudencia","stf","stj","judicial","law","brazil","free"],
    keywords: [],
  },
  tags: ["jurisprudencia","stf","stj","judicial","law","brazil","free"],
  status: "beta",
};
