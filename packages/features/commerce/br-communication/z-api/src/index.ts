import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "z-api",
  name: "Z-API",
  category: "commerce",
  subcategory: "br-communication",
  description: "WhatsApp Business API — send messages, images, documents, manage contacts",
  descriptionPt: "API WhatsApp Business — envio de mensagens, imagens, documentos, gestão de contatos",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["ZAPI_INSTANCE_ID","ZAPI_TOKEN"],
  },
  governance: {
    enabled: false,
    governedTools: [],
  },
  tools,
  discovery: {
    tags: ["whatsapp","messaging","communication","brazil"],
    keywords: [],
  },
  tags: ["whatsapp","messaging","communication","brazil"],
  status: "beta",
};
