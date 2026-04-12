import { describe, it, expect } from "vitest";
import { parseManifest } from "../src/parser.js";
import { generateFeature } from "../src/codegen.js";

const sampleManifest = `
id: test-api
name: TestAPI
category: commerce
subcategory: br-payments
description: A test payment API
descriptionPt: Uma API de pagamento de teste
baseUrl: https://api.test.com/v1
auth:
  type: bearer
  envVars:
    - TEST_API_KEY
governance:
  governedTools:
    - create_payment
tags:
  - payment
  - test
status: alpha
endpoints:
  - name: create_payment
    description: Creates a payment
    descriptionPt: Cria um pagamento
    method: POST
    path: /payments
    governed: true
    body:
      - name: amount
        type: number
        required: true
        description: Payment amount
      - name: currency
        type: string
        required: true
        description: Currency code
  - name: get_payment
    description: Gets a payment by ID
    descriptionPt: Busca um pagamento por ID
    method: GET
    path: /payments/{id}
    params:
      - name: id
        type: string
        required: true
        description: Payment ID
        location: path
`;

describe("parseManifest", () => {
  it("parses a valid YAML manifest", () => {
    const manifest = parseManifest(sampleManifest);
    expect(manifest.id).toBe("test-api");
    expect(manifest.name).toBe("TestAPI");
    expect(manifest.endpoints).toHaveLength(2);
    expect(manifest.auth.type).toBe("bearer");
    expect(manifest.governance?.governedTools).toContain("create_payment");
  });

  it("throws on invalid manifest", () => {
    expect(() => parseManifest("invalid: true")).toThrow("must have id");
  });
});

describe("generateFeature", () => {
  it("generates all expected files", () => {
    const manifest = parseManifest(sampleManifest);
    const files = generateFeature(manifest);

    const paths = files.map((f) => f.path);
    expect(paths).toContain("features/commerce/br-payments/test-api/index.ts");
    expect(paths).toContain("features/commerce/br-payments/test-api/tools.ts");
    expect(paths).toContain("features/commerce/br-payments/test-api/client.ts");
    expect(paths).toContain("features/commerce/br-payments/test-api/schemas.ts");
    expect(paths).toContain("features/commerce/br-payments/test-api/constants.ts");
  });

  it("generates valid FEATURE_META export", () => {
    const manifest = parseManifest(sampleManifest);
    const files = generateFeature(manifest);
    const indexFile = files.find((f) => f.path.endsWith("index.ts"))!;

    expect(indexFile.content).toContain('export const FEATURE_META: FeatureMeta');
    expect(indexFile.content).toContain('"test-api"');
    expect(indexFile.content).toContain('"commerce"');
    expect(indexFile.content).toContain("governance");
  });

  it("generates tool definitions with correct names", () => {
    const manifest = parseManifest(sampleManifest);
    const files = generateFeature(manifest);
    const toolsFile = files.find((f) => f.path.endsWith("tools.ts"))!;

    expect(toolsFile.content).toContain("test_api_create_payment");
    expect(toolsFile.content).toContain("test_api_get_payment");
    expect(toolsFile.content).toContain("defineTool");
  });

  it("generates Zod schemas for endpoints with params", () => {
    const manifest = parseManifest(sampleManifest);
    const files = generateFeature(manifest);
    const schemasFile = files.find((f) => f.path.endsWith("schemas.ts"))!;

    expect(schemasFile.content).toContain("create_paymentSchema");
    expect(schemasFile.content).toContain("z.number()");
    expect(schemasFile.content).toContain("z.string()");
  });

  it("generates HTTP client with auth headers", () => {
    const manifest = parseManifest(sampleManifest);
    const files = generateFeature(manifest);
    const clientFile = files.find((f) => f.path.endsWith("client.ts"))!;

    expect(clientFile.content).toContain("TestAPIClient");
    expect(clientFile.content).toContain("Authorization");
    expect(clientFile.content).toContain("Bearer");
    expect(clientFile.content).toContain("TEST_API_KEY");
  });
});
