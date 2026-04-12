import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "ninety-nine",
  name: "99",
  category: "commerce",
  subcategory: "consumer",
  description: "99 ride-hailing — estimate rides, request drivers, track trips",
  descriptionPt: "99 transporte — estimar corridas, solicitar motoristas, rastrear viagens",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["NINETY_NINE_API_KEY"],
  },
  governance: {
    enabled: true,
    governedTools: ["ninety_nine_request_ride"],
  },
  tools,
  discovery: {
    tags: ["99","ride","transport","mobility","brazil","consumer"],
    keywords: [],
  },
  tags: ["99","ride","transport","mobility","brazil","consumer"],
  status: "alpha",
};
