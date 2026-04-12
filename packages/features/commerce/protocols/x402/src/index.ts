import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "x402",
  name: "x402",
  category: "commerce",
  subcategory: "protocols",
  description: "Coinbase x402 stablecoin payment protocol — pay for web resources with USDC",
  descriptionPt: "Protocolo x402 de pagamento com stablecoins da Coinbase — pague por recursos web com USDC",
  auth: { required: false, type: "none", envVars: [] },
  governance: { enabled: true, governedTools: ["x402_pay_resource"] },
  tools,
  discovery: { tags: ["x402", "crypto", "stablecoin", "usdc", "coinbase"], keywords: ["x402", "stablecoin payment"] },
  tags: ["x402", "crypto", "stablecoin", "usdc"],
  status: "alpha",
};
