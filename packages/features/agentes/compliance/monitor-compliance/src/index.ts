import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "monitor-compliance",
  name: "MonitorCompliance",
  category: "agentes",
  subcategory: "compliance",
  description: "Compliance monitoring agent — tracks governance audit logs, policy violations, risk alerts",
  descriptionPt: "Agente de monitoramento de compliance — acompanha logs de governança, violações de política, alertas de risco",
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
    tags: ["agent","compliance","monitoring","governance","risk","brazil"],
    keywords: [],
  },
  tags: ["agent","compliance","monitoring","governance","risk","brazil"],
  status: "alpha",
};
