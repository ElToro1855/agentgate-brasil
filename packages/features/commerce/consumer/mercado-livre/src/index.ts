import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "mercado-livre",
  name: "MercadoLivre",
  category: "commerce",
  subcategory: "consumer",
  description: "Mercado Livre marketplace — search products, view listings, manage purchases",
  descriptionPt: "Marketplace Mercado Livre — buscar produtos, ver anúncios, gerenciar compras",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["MERCADO_LIVRE_ACCESS_TOKEN"],
  },
  governance: {
    enabled: true,
    governedTools: ["mercado_livre_create_purchase"],
  },
  tools,
  discovery: {
    tags: ["mercado-livre","marketplace","shopping","products","brazil","consumer"],
    keywords: [],
  },
  tags: ["mercado-livre","marketplace","shopping","products","brazil","consumer"],
  status: "alpha",
};
