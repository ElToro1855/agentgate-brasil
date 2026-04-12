import { z } from "zod";

export const get_active_firesSchema = z.object({
  pais_id: z.string().describe("Country ID (33 for Brazil)").optional(),
  estado_id: z.string().describe("State ID").optional(),
});

export const get_fire_countSchema = z.object({
  estado_id: z.string().describe("State ID").optional(),
});

