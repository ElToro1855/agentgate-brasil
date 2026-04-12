import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { track_packageSchema, calculate_shippingSchema } from "./schemas.js";
import { CorreiosClient } from "./client.js";

export const correios_track_package = defineTool({
  name: "correios_track_package",
  description: "Track a package by tracking code",
  descriptionPt: "Rastreia encomenda por código",
  inputSchema: track_packageSchema,
  discovery: {
    tags: ["shipping","postal","tracking","logistics","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new CorreiosClient(context.env);
    return client.track_package(input);
  },
});

export const correios_calculate_shipping = defineTool({
  name: "correios_calculate_shipping",
  description: "Calculate shipping rate",
  descriptionPt: "Calcula frete",
  inputSchema: calculate_shippingSchema,
  discovery: {
    tags: ["shipping","postal","tracking","logistics","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new CorreiosClient(context.env);
    return client.calculate_shipping(input);
  },
});

export const tools = [correios_track_package, correios_calculate_shipping];
