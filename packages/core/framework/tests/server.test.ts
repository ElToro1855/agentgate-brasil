import { describe, it, expect } from "vitest";
import { createAgentGateServer } from "../src/server.js";
import { FeatureRegistry } from "../src/registry.js";
import { z } from "zod";
import type { FeatureMeta } from "../src/types.js";

const testFeature: FeatureMeta = {
  id: "test",
  name: "Test",
  category: "commerce",
  subcategory: "test",
  description: "Test feature",
  descriptionPt: "Feature de teste",
  auth: { required: false, type: "none", envVars: [] },
  governance: { enabled: false, governedTools: [] },
  tools: [
    {
      name: "echo",
      description: "Echoes input",
      inputSchema: z.object({ msg: z.string() }),
      handler: async (input: { msg: string }) => ({ echo: input.msg }),
    },
  ],
  discovery: { tags: ["test"], keywords: [] },
  tags: ["test"],
  status: "ga",
};

describe("createAgentGateServer", () => {
  it("creates a server with registered tools", () => {
    const registry = new FeatureRegistry();
    registry.register(testFeature);

    const server = createAgentGateServer({
      name: "test-server",
      version: "0.1.0",
      registry,
    });

    expect(server).toBeDefined();
    expect(server.registry.size).toBe(1);
  });

  it("accepts filter options", () => {
    const registry = new FeatureRegistry();
    registry.register(testFeature);
    registry.register({ ...testFeature, id: "other", category: "data" });

    const server = createAgentGateServer({
      name: "test-server",
      version: "0.1.0",
      registry,
      filter: { category: "commerce" },
    });

    expect(server).toBeDefined();
  });

  it("has a start function", () => {
    const registry = new FeatureRegistry();
    registry.register(testFeature);

    const server = createAgentGateServer({
      name: "test-server",
      version: "0.1.0",
      registry,
    });

    expect(typeof server.start).toBe("function");
  });
});
