import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "zenvia",
  name: "Zenvia",
  category: "commerce",
  subcategory: "br-communication",
  description: "Zenvia — omnichannel messaging: SMS, WhatsApp, RCS",
  descriptionPt: "Zenvia — mensagens omnichannel: SMS, WhatsApp, RCS",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["ZENVIA_API_TOKEN"],
  },
  governance: {
    enabled: false,
    governedTools: [],
  },
  tools,
  discovery: {
    tags: ["sms","whatsapp","rcs","messaging","brazil"],
    keywords: [],
  },
  tags: ["sms","whatsapp","rcs","messaging","brazil"],
  status: "beta",
};
