import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { create_contactSchema, create_eventSchema } from "./schemas.js";
import { RDStationClient } from "./client.js";

export const rd_station_create_contact = defineTool({
  name: "rd_station_create_contact",
  description: "Create or update a contact/lead",
  descriptionPt: "Cria ou atualiza um contato/lead",
  inputSchema: create_contactSchema,
  discovery: {
    tags: ["marketing","crm","leads","automation","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new RDStationClient(context.env);
    return client.create_contact(input);
  },
});

export const rd_station_create_event = defineTool({
  name: "rd_station_create_event",
  description: "Track a conversion event",
  descriptionPt: "Registra um evento de conversão",
  inputSchema: create_eventSchema,
  discovery: {
    tags: ["marketing","crm","leads","automation","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new RDStationClient(context.env);
    return client.create_event(input);
  },
});

export const tools = [rd_station_create_contact, rd_station_create_event];
