import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "cnes",
  name: "CNES",
  category: "data",
  subcategory: "health",
  description: "National Health Facility Registry — hospitals, clinics, professionals",
  descriptionPt: "Cadastro Nacional de Estabelecimentos de Saúde — hospitais, clínicas, profissionais",
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
    tags: ["cnes", "health", "hospitals", "clinics", "professionals", "brazil", "free"],
    keywords: [],
  },
  tags: ["cnes", "health", "hospitals", "clinics", "professionals", "brazil", "free"],
  status: "alpha",
};
