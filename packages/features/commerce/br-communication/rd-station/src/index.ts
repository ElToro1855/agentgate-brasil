import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "rd-station",
  name: "RDStation",
  category: "commerce",
  subcategory: "br-communication",
  description: "RD Station — marketing automation, CRM, lead management",
  descriptionPt: "RD Station — automação de marketing, CRM, gestão de leads",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["RD_STATION_TOKEN"],
  },
  governance: {
    enabled: false,
    governedTools: [],
  },
  tools,
  discovery: {
    tags: ["marketing","crm","leads","automation","brazil"],
    keywords: [],
  },
  tags: ["marketing","crm","leads","automation","brazil"],
  status: "beta",
};
