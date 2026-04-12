import { describe, it, expect } from "vitest";
import { defineTool } from "../src/tool.js";
import { z } from "zod";

describe("defineTool", () => {
  it("creates a tool with name, description, and handler", () => {
    const tool = defineTool({
      name: "test_tool",
      description: "A test tool",
      inputSchema: z.object({
        value: z.string(),
      }),
      handler: async (input) => {
        return { result: input.value };
      },
    });

    expect(tool.name).toBe("test_tool");
    expect(tool.description).toBe("A test tool");
    expect(typeof tool.handler).toBe("function");
  });

  it("includes optional discovery metadata", () => {
    const tool = defineTool({
      name: "tagged_tool",
      description: "Tool with tags",
      descriptionPt: "Ferramenta com tags",
      inputSchema: z.object({}),
      discovery: {
        tags: ["payment", "pix"],
        keywords: ["pagar", "cobrar"],
      },
      handler: async () => ({ ok: true }),
    });

    expect(tool.descriptionPt).toBe("Ferramenta com tags");
    expect(tool.discovery?.tags).toContain("pix");
  });

  it("handler executes and returns result", async () => {
    const tool = defineTool({
      name: "echo",
      description: "Echoes input",
      inputSchema: z.object({ msg: z.string() }),
      handler: async (input) => ({ echo: input.msg }),
    });

    const result = await tool.handler({ msg: "hello" }, {} as any);
    expect(result).toEqual({ echo: "hello" });
  });
});
