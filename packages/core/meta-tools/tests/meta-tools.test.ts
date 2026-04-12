import { describe, it, expect } from "vitest";
import { FeatureRegistry } from "@agentgate/framework";
import type { FeatureMeta } from "@agentgate/framework";
import { createMetaTools } from "../src/index.js";
import { z } from "zod";

const mockFeature: FeatureMeta = {
  id: "test-payments",
  name: "Test Payments",
  category: "commerce",
  subcategory: "br-payments",
  description: "Test payment feature",
  descriptionPt: "Feature de pagamento de teste",
  auth: { required: false, type: "none", envVars: [] },
  governance: { enabled: false, governedTools: [] },
  tools: [
    {
      name: "create_pix",
      description: "Creates a Pix payment",
      descriptionPt: "Cria um pagamento Pix",
      inputSchema: z.object({ amount: z.number() }),
      discovery: { tags: ["pix", "payment"], keywords: ["pagar pix"] },
      handler: async (input: { amount: number }) => ({ success: true, amount: input.amount }),
    },
  ],
  discovery: { tags: ["payment", "pix"], keywords: ["pagamento"] },
  tags: ["payment"],
  status: "ga",
};

const mockContext = {
  env: {},
  logger: { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} },
};

describe("createMetaTools", () => {
  it("creates 5 meta-tools", () => {
    const registry = new FeatureRegistry();
    registry.register(mockFeature);
    const tools = createMetaTools(registry);
    expect(tools).toHaveLength(5);
    expect(tools.map((t) => t.name)).toEqual([
      "listar_features",
      "recomendar_tools",
      "planejar_consulta",
      "executar_lote",
      "verificar_governanca",
    ]);
  });
});

describe("listar_features", () => {
  it("lists all features", async () => {
    const registry = new FeatureRegistry();
    registry.register(mockFeature);
    const tools = createMetaTools(registry);
    const listar = tools[0];

    const result = await listar.handler({ language: "pt" }, mockContext as any);
    expect(result.total).toBe(1);
    expect(result.features[0].id).toBe("test-payments");
    expect(result.features[0].description).toBe("Feature de pagamento de teste");
  });

  it("filters by category", async () => {
    const registry = new FeatureRegistry();
    registry.register(mockFeature);
    registry.register({ ...mockFeature, id: "test-data", category: "data", descriptionPt: "Dados" });
    const tools = createMetaTools(registry);

    const result = await tools[0].handler({ category: "commerce", language: "en" }, mockContext as any);
    expect(result.total).toBe(1);
  });
});

describe("recomendar_tools", () => {
  it("finds tools by query", async () => {
    const registry = new FeatureRegistry();
    registry.register(mockFeature);
    const tools = createMetaTools(registry);
    const recomendar = tools[1];

    const result = await recomendar.handler({ query: "pix payment", limit: 5 }, mockContext as any);
    expect(result.results.length).toBeGreaterThan(0);
    expect(result.results[0].name).toBe("create_pix");
  });
});

describe("executar_lote", () => {
  it("executes multiple tools in parallel", async () => {
    const registry = new FeatureRegistry();
    registry.register(mockFeature);
    const tools = createMetaTools(registry);
    const executar = tools[3];

    const result = await executar.handler({
      calls: [
        { tool: "create_pix", arguments: { amount: 100 } },
        { tool: "create_pix", arguments: { amount: 200 } },
      ],
    }, mockContext as any);

    expect(result.total).toBe(2);
    expect(result.succeeded).toBe(2);
    expect(result.failed).toBe(0);
  });

  it("handles missing tools gracefully", async () => {
    const registry = new FeatureRegistry();
    registry.register(mockFeature);
    const tools = createMetaTools(registry);
    const executar = tools[3];

    const result = await executar.handler({
      calls: [{ tool: "nonexistent", arguments: {} }],
    }, mockContext as any);

    expect(result.failed).toBe(1);
    expect(result.results[0].error).toContain("not found");
  });
});

describe("verificar_governanca", () => {
  it("reports disabled when no config", async () => {
    const registry = new FeatureRegistry();
    registry.register(mockFeature);
    const tools = createMetaTools(registry);
    const verificar = tools[4];

    const result = await verificar.handler({}, mockContext as any);
    expect(result.enabled).toBe(false);
  });

  it("reports enabled when config present", async () => {
    const registry = new FeatureRegistry();
    registry.register(mockFeature);
    const tools = createMetaTools(registry);
    const verificar = tools[4];

    const result = await verificar.handler({}, {
      ...mockContext,
      governanceConfig: { apiKey: "test", apiUrl: "https://test.agentgate.dev" },
    } as any);

    expect(result.enabled).toBe(true);
    expect(result.api_url).toBe("https://test.agentgate.dev");
  });
});
