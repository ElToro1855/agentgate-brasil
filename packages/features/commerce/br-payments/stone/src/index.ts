import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "stone",
  name: "Stone",
  category: "commerce",
  subcategory: "br-payments",
  description: "Stone — open banking, Pix, card processing for merchants",
  descriptionPt: "Stone — open banking, Pix, processamento de cartões para lojistas",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["STONE_API_KEY"],
  },
  governance: {
    enabled: true,
    governedTools: ["stone_create_pix_payment"],
  },
  tools,
  discovery: {
    tags: ["payments","open-banking","pix","stone","brazil"],
    keywords: [],
  },
  tags: ["payments","open-banking","pix","stone","brazil"],
  status: "beta",
};
