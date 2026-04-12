import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "take-blip",
  name: "TakeBlip",
  category: "commerce",
  subcategory: "br-communication",
  description: "Take Blip — chatbot platform, WhatsApp Business, conversational commerce",
  descriptionPt: "Take Blip — plataforma de chatbot, WhatsApp Business, comércio conversacional",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["TAKE_BLIP_KEY"],
  },
  governance: {
    enabled: false,
    governedTools: [],
  },
  tools,
  discovery: {
    tags: ["chatbot","whatsapp","conversational","commerce","brazil"],
    keywords: [],
  },
  tags: ["chatbot","whatsapp","conversational","commerce","brazil"],
  status: "beta",
};
