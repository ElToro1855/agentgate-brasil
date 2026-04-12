import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "compras-gov",
  name: "ComprasGov",
  category: "data",
  subcategory: "public-procurement",
  description: "ComprasNet/Compras.gov — federal government procurement, bids, prices",
  descriptionPt: "ComprasNet/Compras.gov — compras governamentais, licitações, preços praticados",
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
    tags: ["compras-gov", "procurement", "bids", "government", "prices", "brazil", "free"],
    keywords: [],
  },
  tags: ["compras-gov", "procurement", "bids", "government", "prices", "brazil", "free"],
  status: "alpha",
};
