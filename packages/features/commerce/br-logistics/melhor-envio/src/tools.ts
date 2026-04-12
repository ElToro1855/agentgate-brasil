import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { calculate_shippingSchema, create_shipmentSchema, track_shipmentSchema, generate_labelSchema } from "./schemas.js";
import { MelhorEnvioClient } from "./client.js";

export const melhor_envio_calculate_shipping = defineTool({
  name: "melhor_envio_calculate_shipping",
  description: "Calculate shipping quotes for a package",
  descriptionPt: "Calcula cotações de frete para um pacote",
  inputSchema: calculate_shippingSchema,
  discovery: {
    tags: ["shipping","logistics","freight","tracking","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new MelhorEnvioClient(context.env);
    return client.calculate_shipping(input);
  },
});

export const melhor_envio_create_shipment = defineTool({
  name: "melhor_envio_create_shipment",
  description: "Create a shipment order",
  descriptionPt: "Cria um pedido de envio",
  inputSchema: create_shipmentSchema,
  discovery: {
    tags: ["shipping","logistics","freight","tracking","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new MelhorEnvioClient(context.env);
    return client.create_shipment(input);
  },
});

export const melhor_envio_track_shipment = defineTool({
  name: "melhor_envio_track_shipment",
  description: "Track a shipment by order ID",
  descriptionPt: "Rastreia um envio pelo ID do pedido",
  inputSchema: track_shipmentSchema,
  discovery: {
    tags: ["shipping","logistics","freight","tracking","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new MelhorEnvioClient(context.env);
    return client.track_shipment(input);
  },
});

export const melhor_envio_generate_label = defineTool({
  name: "melhor_envio_generate_label",
  description: "Generate shipping label",
  descriptionPt: "Gera etiqueta de envio",
  inputSchema: generate_labelSchema,
  discovery: {
    tags: ["shipping","logistics","freight","tracking","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new MelhorEnvioClient(context.env);
    return client.generate_label(input);
  },
});

export const melhor_envio_list_shipments = defineTool({
  name: "melhor_envio_list_shipments",
  description: "List shipment orders",
  descriptionPt: "Lista pedidos de envio",
  inputSchema: z.object({}),
  discovery: {
    tags: ["shipping","logistics","freight","tracking","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new MelhorEnvioClient(context.env);
    return client.list_shipments(input);
  },
});

export const tools = [melhor_envio_calculate_shipping, melhor_envio_create_shipment, melhor_envio_track_shipment, melhor_envio_generate_label, melhor_envio_list_shipments];
