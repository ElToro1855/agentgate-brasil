import { z } from "zod";

export const search_itemsSchema = z.object({
  Keywords: z.string().describe("Search keywords"),
  SearchIndex: z.string().describe("Category (All, Electronics, Books, etc.)").optional(),
  ItemCount: z.number().describe("Max results (1-10)").optional(),
});

export const get_itemSchema = z.object({
  ItemIds: z.record(z.unknown()).describe("Array of ASINs"),
});

export const get_browse_nodesSchema = z.object({
  BrowseNodeIds: z.record(z.unknown()).describe("Array of category IDs"),
});

