import type { FeatureRegistry } from "@agentgate/framework";
import { ToolDiscovery } from "@agentgate/discovery";
import { createListarFeatures } from "./listar-features.js";
import { createRecomendarTools } from "./recomendar-tools.js";
import { createPlanejarConsulta } from "./planejar-consulta.js";
import { createExecutarLote } from "./executar-lote.js";
import { createVerificarGovernanca } from "./verificar-governanca.js";

export {
  createListarFeatures,
  createRecomendarTools,
  createPlanejarConsulta,
  createExecutarLote,
  createVerificarGovernanca,
};

/**
 * Create all 5 meta-tools, wired to the registry and discovery engine.
 */
export function createMetaTools(registry: FeatureRegistry) {
  const allTools = registry.getAllTools();
  const discovery = new ToolDiscovery(allTools);

  return [
    createListarFeatures(registry),
    createRecomendarTools(discovery),
    createPlanejarConsulta(discovery),
    createExecutarLote(registry),
    createVerificarGovernanca(),
  ];
}
