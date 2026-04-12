import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "redator-oficial",
  name: "RedatorOficial",
  category: "agentes",
  subcategory: "document",
  description: "Official document writer — generates ofícios, pareceres, portarias using real government data",
  descriptionPt: "Redator de documentos oficiais — gera ofícios, pareceres, portarias usando dados governamentais reais",
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
    tags: ["agent","documents","official","government","writing","brazil"],
    keywords: [],
  },
  tags: ["agent","documents","official","government","writing","brazil"],
  status: "alpha",
};
