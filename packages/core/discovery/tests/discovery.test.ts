import { describe, it, expect } from "vitest";
import { ToolDiscovery } from "../src/discovery.js";
import { BM25Index } from "../src/bm25.js";
import type { Tool } from "@agentgate/framework";
import { z } from "zod";

const noop = async () => ({});

const mockTools: Tool[] = [
  {
    name: "create_pix_transaction",
    description: "Creates a Pix payment transaction",
    descriptionPt: "Cria uma transação de pagamento Pix",
    inputSchema: z.object({}),
    discovery: { tags: ["pix", "payment", "brazil"], keywords: ["pagar", "cobrar pix"] },
    handler: noop,
  },
  {
    name: "create_credit_card_charge",
    description: "Creates a credit card charge via Stripe",
    descriptionPt: "Cria uma cobrança de cartão de crédito via Stripe",
    inputSchema: z.object({}),
    discovery: { tags: ["credit-card", "stripe", "charge"], keywords: ["cobrar cartão"] },
    handler: noop,
  },
  {
    name: "search_cnpj",
    description: "Search company data by CNPJ number",
    descriptionPt: "Busca dados de empresa por CNPJ",
    inputSchema: z.object({}),
    discovery: { tags: ["cnpj", "company", "identity"], keywords: ["consultar cnpj", "empresa"] },
    handler: noop,
  },
  {
    name: "get_selic_rate",
    description: "Get current Selic interest rate from BACEN",
    descriptionPt: "Consulta taxa Selic atual do BACEN",
    inputSchema: z.object({}),
    discovery: { tags: ["selic", "bacen", "interest", "economic"], keywords: ["taxa selic", "juros"] },
    handler: noop,
  },
];

describe("BM25Index", () => {
  it("returns results sorted by relevance", () => {
    const index = new BM25Index();
    index.addDocument("a", "pix payment brazil instant");
    index.addDocument("b", "credit card stripe charge");
    index.addDocument("c", "company search cnpj");
    index.build();

    const results = index.search("pix payment");
    expect(results[0].id).toBe("a");
    expect(results[0].score).toBeGreaterThan(0);
  });

  it("returns empty for no matches", () => {
    const index = new BM25Index();
    index.addDocument("a", "pix payment");
    index.build();

    const results = index.search("zebra");
    expect(results).toHaveLength(0);
  });
});

describe("ToolDiscovery", () => {
  it("finds relevant tools by English query", () => {
    const discovery = new ToolDiscovery(mockTools);
    const results = discovery.search("pix payment");

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toBe("create_pix_transaction");
  });

  it("finds relevant tools by Portuguese query", () => {
    const discovery = new ToolDiscovery(mockTools);
    const results = discovery.search("consultar cnpj empresa");

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toBe("search_cnpj");
  });

  it("finds tools by tag keywords", () => {
    const discovery = new ToolDiscovery(mockTools);
    const results = discovery.search("selic bacen");

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toBe("get_selic_rate");
  });

  it("exact mode filters by substring", () => {
    const discovery = new ToolDiscovery(mockTools, "exact");
    const results = discovery.search("pix");

    expect(results.length).toBe(1);
    expect(results[0].name).toBe("create_pix_transaction");
  });

  it("none mode returns all tools", () => {
    const discovery = new ToolDiscovery(mockTools, "none");
    const results = discovery.search("anything");

    expect(results.length).toBe(4);
  });

  it("reports correct size", () => {
    const discovery = new ToolDiscovery(mockTools);
    expect(discovery.size).toBe(4);
  });
});
