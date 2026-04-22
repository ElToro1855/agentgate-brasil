# `@agentgate/generator`

Scaffolding CLI for new [AgentGate Brasil](https://github.com/ElToro1855/agentgate-brasil) feature packages. Takes a brief YAML manifest (or an OpenAPI spec URL) and emits a complete package skeleton: `package.json`, `tsconfig.json`, `src/index.ts`, `src/client.ts`, `src/tools.ts`, `src/schemas.ts`, tests.

```bash
npm install -g @agentgate/generator
agentgate-generate --help
```

---

## Why

Adding a new Brazilian service integration to AgentGate — say a new PIX provider — typically involves the same 6-7 files with different identifiers. Hand-writing every file is copy-paste work prone to drift.

The generator emits the scaffold from a ~30-line YAML file, then you fill in the actual API calls.

## Quickstart

```bash
# Interactive
agentgate-generate new

# From a manifest
agentgate-generate new --manifest ./my-feature.yaml

# From an OpenAPI spec
agentgate-generate new --openapi https://api.example.com/openapi.json \
  --package-name @agentgate/mcp-example \
  --category commerce \
  --subcategory br-payments
```

## Example manifest

```yaml
name: "@agentgate/mcp-example"
id: "example"
displayName: "Example Payments"
category: commerce
subcategory: br-payments
description: "Example Brazilian payment provider integration"
descriptionPt: "Integração com provedor brasileiro de pagamentos Example"

auth:
  type: bearer
  envVars: [EXAMPLE_API_KEY]

governance:
  enabled: true
  governedTools: [example_create_charge]

tools:
  - name: example_create_charge
    description: "Creates a charge via Example API"
    inputs:
      amount: { type: number, min: 0.01 }
      currency: { type: string, default: BRL }
    governed: true

  - name: example_get_charge
    description: "Retrieves a charge by ID"
    inputs:
      charge_id: { type: string }
```

Run `agentgate-generate new --manifest ./example.yaml` and you get a ready-to-edit package under `packages/features/commerce/br-payments/example/`.

## Commands

- `new` — scaffold a fresh feature package
- `update` — regenerate boilerplate (schemas, index) from a changed manifest without clobbering handwritten client code
- `lint` — verify a feature package against framework conventions (required exports, tool naming, governance wiring)
- `feature-manifest` — regenerate `packages/distributions/brasil/src/feature-manifest.generated.ts` (called automatically by `pnpm prebuild`)

## License

MIT — part of the [AgentGate Brasil](https://github.com/ElToro1855/agentgate-brasil) monorepo.
