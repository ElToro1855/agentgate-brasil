import { parse as parseYaml } from "yaml";
import type { ApiManifest } from "./types.js";

/**
 * Parse a YAML manifest string into an ApiManifest.
 */
export function parseManifest(yamlContent: string): ApiManifest {
  const raw = parseYaml(yamlContent);

  if (!raw.id || !raw.name || !raw.endpoints) {
    throw new Error("Manifest must have id, name, and endpoints");
  }

  return {
    id: raw.id,
    name: raw.name,
    category: raw.category || "commerce",
    subcategory: raw.subcategory || "other",
    description: raw.description || raw.name,
    descriptionPt: raw.descriptionPt || raw.description || raw.name,
    baseUrl: raw.baseUrl || "",
    auth: raw.auth || { type: "none", envVars: [] },
    governance: raw.governance,
    tags: raw.tags || [],
    status: raw.status || "alpha",
    endpoints: (raw.endpoints || []).map((ep: any) => ({
      name: ep.name,
      description: ep.description || ep.name,
      descriptionPt: ep.descriptionPt || ep.description || ep.name,
      method: (ep.method || "GET").toUpperCase(),
      path: ep.path,
      governed: ep.governed || false,
      params: ep.params || [],
      body: ep.body || [],
    })),
  };
}
