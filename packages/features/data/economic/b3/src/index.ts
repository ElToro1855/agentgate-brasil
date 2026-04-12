import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "b3",
  name: "B3",
  category: "data",
  subcategory: "economic",
  description: "B3 Brazilian Stock Exchange — stock quotes, indices, market data",
  descriptionPt: "B3 Bolsa de Valores — cotações, índices, dados de mercado",
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
    tags: ["b3", "stocks", "market", "ibovespa", "economic", "brazil", "free"],
    keywords: [],
  },
  tags: ["b3", "stocks", "market", "ibovespa", "economic", "brazil", "free"],
  status: "alpha",
};
