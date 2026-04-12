import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "rappi",
  name: "Rappi",
  category: "commerce",
  subcategory: "consumer",
  description: "Rappi on-demand delivery — restaurants, groceries, pharmacy, anything",
  descriptionPt: "Rappi delivery sob demanda — restaurantes, mercado, farmácia, qualquer coisa",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["RAPPI_API_KEY"],
  },
  governance: {
    enabled: true,
    governedTools: ["rappi_place_order"],
  },
  tools,
  discovery: {
    tags: ["rappi","delivery","food","grocery","pharmacy","brazil","consumer"],
    keywords: [],
  },
  tags: ["rappi","delivery","food","grocery","pharmacy","brazil","consumer"],
  status: "alpha",
};
