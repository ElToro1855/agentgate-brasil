import { describe, it, expect, vi, beforeEach } from "vitest";
import { FEATURE_META } from "../src/index.js";
import { FeatureRegistry, createAgentGateServer } from "@agentgate/framework";

describe("stripe-acp FEATURE_META", () => {
  it("has correct id and category", () => {
    expect(FEATURE_META.id).toBe("stripe-acp");
    expect(FEATURE_META.category).toBe("commerce");
    expect(FEATURE_META.subcategory).toBe("protocols");
  });

  it("has 4 tools", () => {
    expect(FEATURE_META.tools).toHaveLength(4);
    const names = FEATURE_META.tools.map((t) => t.name);
    expect(names).toContain("stripe_acp_create_payment_intent");
    expect(names).toContain("stripe_acp_confirm_payment_intent");
    expect(names).toContain("stripe_acp_get_payment_intent");
    expect(names).toContain("stripe_acp_list_payment_intents");
  });

  it("marks create_payment_intent as governed", () => {
    expect(FEATURE_META.governance.enabled).toBe(true);
    expect(FEATURE_META.governance.governedTools).toContain("stripe_acp_create_payment_intent");
  });

  it("requires STRIPE_SECRET_KEY", () => {
    expect(FEATURE_META.auth.required).toBe(true);
    expect(FEATURE_META.auth.envVars).toContain("STRIPE_SECRET_KEY");
  });

  it("has bilingual descriptions", () => {
    expect(FEATURE_META.description).toBeTruthy();
    expect(FEATURE_META.descriptionPt).toBeTruthy();
    for (const tool of FEATURE_META.tools) {
      expect(tool.description).toBeTruthy();
      expect(tool.descriptionPt).toBeTruthy();
    }
  });
});

describe("stripe-acp registration", () => {
  it("registers in FeatureRegistry", () => {
    const registry = new FeatureRegistry();
    registry.register(FEATURE_META);

    expect(registry.size).toBe(1);
    expect(registry.getFeature("stripe-acp")).toBe(FEATURE_META);
    expect(registry.getAllTools()).toHaveLength(4);
  });

  it("creates a valid MCP server", () => {
    const registry = new FeatureRegistry();
    registry.register(FEATURE_META);

    const server = createAgentGateServer({
      name: "test",
      version: "0.1.0",
      registry,
    });

    expect(server).toBeDefined();
    expect(typeof server.start).toBe("function");
  });
});
