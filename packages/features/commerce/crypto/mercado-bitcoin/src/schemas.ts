import { z } from "zod";

export const get_tickerSchema = z.object({
  symbols: z.string().describe("Comma-separated symbols (BTC-BRL,ETH-BRL)").optional(),
});

export const get_orderbookSchema = z.object({
  symbol: z.string().describe("Trading pair (e.g., BTC-BRL)"),
});

