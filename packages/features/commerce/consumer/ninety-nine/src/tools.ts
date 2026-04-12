import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { estimate_rideSchema, request_rideSchema, track_rideSchema, cancel_rideSchema } from "./schemas.js";
import { NinetyNineClient } from "./client.js";

export const ninety_nine_estimate_ride = defineTool({
  name: "ninety_nine_estimate_ride",
  description: "Get ride price estimate between two points",
  descriptionPt: "Estima preço de corrida entre dois pontos",
  inputSchema: estimate_rideSchema,
  discovery: {
    tags: ["99","ride","transport","mobility","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new NinetyNineClient(context.env);
    return client.estimate_ride(input);
  },
});

export const ninety_nine_request_ride = defineTool({
  name: "ninety_nine_request_ride",
  description: "Request a ride. GOVERNED.",
  descriptionPt: "Solicita uma corrida. GOVERNADO.",
  inputSchema: request_rideSchema,
  discovery: {
    tags: ["99","ride","transport","mobility","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new NinetyNineClient(context.env);
    return client.request_ride(input);
  },
});

export const ninety_nine_track_ride = defineTool({
  name: "ninety_nine_track_ride",
  description: "Track an active ride",
  descriptionPt: "Rastreia uma corrida ativa",
  inputSchema: track_rideSchema,
  discovery: {
    tags: ["99","ride","transport","mobility","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new NinetyNineClient(context.env);
    return client.track_ride(input);
  },
});

export const ninety_nine_cancel_ride = defineTool({
  name: "ninety_nine_cancel_ride",
  description: "Cancel a ride request",
  descriptionPt: "Cancela uma solicitação de corrida",
  inputSchema: cancel_rideSchema,
  discovery: {
    tags: ["99","ride","transport","mobility","brazil","consumer"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new NinetyNineClient(context.env);
    return client.cancel_ride(input);
  },
});

export const tools = [ninety_nine_estimate_ride, ninety_nine_request_ride, ninety_nine_track_ride, ninety_nine_cancel_ride];
