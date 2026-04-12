import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "ifood",
  name: "iFood",
  category: "commerce",
  subcategory: "consumer",
  description: "iFood food delivery — search restaurants, browse menus, place orders, track delivery",
  descriptionPt: "iFood delivery de comida — buscar restaurantes, ver cardápios, fazer pedidos, rastrear entrega",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["IFOOD_CLIENT_ID","IFOOD_CLIENT_SECRET"],
  },
  governance: {
    enabled: true,
    governedTools: ["ifood_place_order"],
  },
  tools,
  discovery: {
    tags: ["ifood","food","delivery","restaurant","brazil","consumer"],
    keywords: [],
  },
  tags: ["ifood","food","delivery","restaurant","brazil","consumer"],
  status: "alpha",
};
