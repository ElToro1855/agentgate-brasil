import { describe, it, expect, beforeEach } from "vitest";
import { FeatureRegistry } from "../src/registry.js";
import type { FeatureMeta } from "../src/types.js";
import { z } from "zod";

const mockFeature: FeatureMeta = {
  id: "test-feature",
  name: "Test Feature",
  category: "commerce",
  subcategory: "br-payments",
  description: "A test feature for unit tests",
  descriptionPt: "Uma feature de teste para testes unitários",
  auth: {
    required: false,
    type: "none",
    envVars: [],
  },
  governance: {
    enabled: false,
    governedTools: [],
  },
  tools: [
    {
      name: "test_tool",
      description: "A test tool",
      inputSchema: z.object({ value: z.string() }),
      handler: async (input: { value: string }) => ({ result: input.value }),
    },
  ],
  discovery: {
    tags: ["test"],
    keywords: ["testing"],
  },
  tags: ["test"],
  status: "alpha",
};

describe("FeatureRegistry", () => {
  let registry: FeatureRegistry;

  beforeEach(() => {
    registry = new FeatureRegistry();
  });

  it("starts empty", () => {
    expect(registry.getAllFeatures()).toHaveLength(0);
    expect(registry.getAllTools()).toHaveLength(0);
  });

  it("registers a feature", () => {
    registry.register(mockFeature);
    expect(registry.getAllFeatures()).toHaveLength(1);
    expect(registry.getFeature("test-feature")).toEqual(mockFeature);
  });

  it("returns all tools across features", () => {
    registry.register(mockFeature);
    const tools = registry.getAllTools();
    expect(tools).toHaveLength(1);
    expect(tools[0].name).toBe("test_tool");
  });

  it("filters features by category", () => {
    registry.register(mockFeature);
    registry.register({ ...mockFeature, id: "data-feature", category: "data" });

    expect(registry.filterFeatures({ category: "commerce" })).toHaveLength(1);
    expect(registry.filterFeatures({ category: "data" })).toHaveLength(1);
  });

  it("filters features by include list", () => {
    registry.register(mockFeature);
    registry.register({ ...mockFeature, id: "other" });

    expect(registry.filterFeatures({ include: ["test-feature"] })).toHaveLength(1);
  });

  it("filters features by exclude list", () => {
    registry.register(mockFeature);
    registry.register({ ...mockFeature, id: "other" });

    expect(registry.filterFeatures({ exclude: ["test-feature"] })).toHaveLength(1);
    expect(registry.filterFeatures({ exclude: ["test-feature"] })[0].id).toBe("other");
  });

  it("rejects duplicate feature IDs", () => {
    registry.register(mockFeature);
    expect(() => registry.register(mockFeature)).toThrow("already registered");
  });

  it("reports correct size", () => {
    expect(registry.size).toBe(0);
    registry.register(mockFeature);
    expect(registry.size).toBe(1);
  });
});
