import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "datajud",
  name: "DataJud",
  category: "data",
  subcategory: "judicial",
  description: "DataJud — national judicial process database, search across all courts",
  descriptionPt: "DataJud — base nacional de processos judiciais, busca em todos os tribunais",
  auth: {
    required: true,
    type: "api_key",
    envVars: ["DATAJUD_API_KEY"],
  },
  governance: {
    enabled: false,
    governedTools: [],
  },
  tools,
  discovery: {
    tags: ["datajud", "judicial", "courts", "lawsuits", "brazil"],
    keywords: [],
  },
  tags: ["datajud", "judicial", "courts", "lawsuits", "brazil"],
  status: "beta",
};
