import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "magalu",
  name: "Magalu",
  category: "commerce",
  subcategory: "consumer",
  description: "Magazine Luiza — product search, pricing, availability across Brazil's largest retailer",
  descriptionPt: "Magazine Luiza — busca de produtos, preços, disponibilidade na maior varejista do Brasil",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["MAGALU_API_KEY"],
  },
  governance: {
    enabled: false,
    governedTools: [],
  },
  tools,
  discovery: {
    tags: ["magalu","shopping","retail","electronics","brazil","consumer"],
    keywords: [],
  },
  tags: ["magalu","shopping","retail","electronics","brazil","consumer"],
  status: "alpha",
};
