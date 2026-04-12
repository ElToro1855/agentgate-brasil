import { z } from "zod";

export const list_stationsSchema = z.object({
  uf: z.string().optional().describe("State (UF)"),
});

export const get_station_dataSchema = z.object({
  code: z.string().describe("Station code"),
});
