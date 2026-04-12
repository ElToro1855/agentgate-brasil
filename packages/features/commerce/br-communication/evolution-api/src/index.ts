import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "evolution-api",
  name: "EvolutionAPI",
  category: "commerce",
  subcategory: "br-communication",
  description: "Evolution API — open-source WhatsApp API, messages, groups, media",
  descriptionPt: "Evolution API — API WhatsApp open-source, mensagens, grupos, mídia",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["EVOLUTION_API_KEY"],
  },
  governance: {
    enabled: false,
    governedTools: [],
  },
  tools,
  discovery: {
    tags: ["whatsapp","messaging","communication","open-source","brazil"],
    keywords: [],
  },
  tags: ["whatsapp","messaging","communication","open-source","brazil"],
  status: "beta",
};
