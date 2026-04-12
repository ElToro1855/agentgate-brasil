import type { FeatureMeta, Tool } from "./types.js";

/**
 * Feature registry — the central catalog of all registered features.
 *
 * Features register via FEATURE_META exports discovered at startup.
 * The registry provides filtering by category, include/exclude lists,
 * and aggregation of all tools across features.
 */
export class FeatureRegistry {
  private features: Map<string, FeatureMeta> = new Map();

  /**
   * Register a feature. Throws if a feature with the same ID already exists.
   */
  register(meta: FeatureMeta): void {
    if (this.features.has(meta.id)) {
      throw new Error(`Feature "${meta.id}" is already registered`);
    }
    this.features.set(meta.id, meta);
  }

  /**
   * Get all registered features.
   */
  getAllFeatures(): FeatureMeta[] {
    return Array.from(this.features.values());
  }

  /**
   * Get a single feature by ID.
   */
  getFeature(id: string): FeatureMeta | undefined {
    return this.features.get(id);
  }

  /**
   * Get all tools across all registered features.
   */
  getAllTools(): Tool[] {
    return this.getAllFeatures().flatMap((f) => f.tools);
  }

  /**
   * Filter features by category, include list, or exclude list.
   */
  filterFeatures(opts: {
    include?: string[];
    exclude?: string[];
    category?: string;
  }): FeatureMeta[] {
    let features = this.getAllFeatures();
    if (opts.include) {
      features = features.filter((f) => opts.include!.includes(f.id));
    }
    if (opts.exclude) {
      features = features.filter((f) => !opts.exclude!.includes(f.id));
    }
    if (opts.category) {
      features = features.filter((f) => f.category === opts.category);
    }
    return features;
  }

  /**
   * Get feature count.
   */
  get size(): number {
    return this.features.size;
  }
}
