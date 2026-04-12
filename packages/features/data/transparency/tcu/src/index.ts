import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "tcu",
  name: "TCU",
  category: "data",
  subcategory: "transparency",
  description: "TCU Federal Audit Court — audit reports, sanctions, responsible parties",
  descriptionPt: "TCU Tribunal de Contas da União — relatórios de auditoria, sanções, responsáveis",
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
    tags: ["tcu", "audit", "transparency", "accountability", "brazil", "free"],
    keywords: [],
  },
  tags: ["tcu", "audit", "transparency", "accountability", "brazil", "free"],
  status: "alpha",
};
