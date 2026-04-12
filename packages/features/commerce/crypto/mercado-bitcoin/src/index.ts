import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "mercado-bitcoin",
  name: "MercadoBitcoin",
  category: "commerce",
  subcategory: "crypto",
  description: "Mercado Bitcoin — Brazilian crypto exchange, trading, balances",
  descriptionPt: "Mercado Bitcoin — exchange de criptomoedas brasileira, negociação, saldos",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["MERCADO_BITCOIN_API_KEY"],
  },
  governance: {
    enabled: false,
    governedTools: [],
  },
  tools,
  discovery: {
    tags: ["crypto","bitcoin","exchange","trading","brazil"],
    keywords: [],
  },
  tags: ["crypto","bitcoin","exchange","trading","brazil"],
  status: "beta",
};
