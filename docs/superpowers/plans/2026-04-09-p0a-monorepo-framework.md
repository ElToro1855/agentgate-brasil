# P0-A: Monorepo + Framework — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize the AgentGate Brasil pnpm monorepo with Turborepo, and build `@agentgate/framework` — the core MCP server wrapper with auto-registry, `FeatureMeta` type, and `defineTool` helper.

**Architecture:** pnpm workspaces + Turborepo for build orchestration. TypeScript strict mode with project references for incremental compilation. `@agentgate/framework` provides the MCP server (stdio transport), an auto-registry that discovers `FEATURE_META` exports at startup, and a `defineTool` helper for type-safe tool definitions. No shared types package — types live in the package that owns them.

**Tech Stack:** pnpm, Turborepo, TypeScript 5.x (composite + project references), Biome, Vitest, Changesets, `@modelcontextprotocol/sdk`

---

## File Structure

### Root (monorepo scaffold)

| File | Responsibility |
|------|---------------|
| `pnpm-workspace.yaml` | Workspace config |
| `turbo.json` | Build pipeline |
| `tsconfig.base.json` | Shared TS config (composite, strict) |
| `biome.json` | Linting/formatting |
| `package.json` | Root scripts |
| `.gitignore` | Standard ignores |
| `.env.example` | Empty template |
| `.nvmrc` | Node version pin |
| `.npmrc` | pnpm config |
| `LICENSE` | MIT |
| `README.md` | Project overview |
| `CONTRIBUTING.md` | Stub |
| `.changeset/config.json` | Changesets config |
| `.github/workflows/ci.yml` | CI pipeline |

### `packages/core/framework/`

| File | Responsibility |
|------|---------------|
| `src/index.ts` | Public API exports |
| `src/types.ts` | `FeatureMeta`, `Tool`, `ToolHandler`, `FeatureAuth`, `FeatureGovernance` |
| `src/tool.ts` | `defineTool` helper |
| `src/registry.ts` | `FeatureRegistry` — auto-discovery of FEATURE_META exports |
| `src/server.ts` | MCP server wrapper (stdio transport) |
| `src/logger.ts` | Structured logging helper |
| `tests/types.test.ts` | Type validation tests |
| `tests/tool.test.ts` | defineTool tests |
| `tests/registry.test.ts` | Auto-registry tests |
| `tests/server.test.ts` | MCP server tests |
| `package.json` | Package manifest |
| `tsconfig.json` | TS config with project references |
| `README.md` | Package docs |

### Placeholder directories

| Path | Purpose |
|------|---------|
| `packages/core/discovery/` | P0-B placeholder |
| `packages/core/governance/` | P0-C placeholder |
| `packages/core/meta-tools/` | P0-B placeholder |
| `packages/core/generator/` | P0-D placeholder |
| `packages/features/_shared/.gitkeep` | Shared feature utilities placeholder |
| `packages/features/commerce/protocols/stripe-acp/` | P0-D placeholder |
| `packages/distributions/` | Distribution packages placeholder |
| `apps/` | Apps placeholder |

---

### Task 1: Monorepo scaffold — root config files

**Files:**
- Create: `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json`, `biome.json`, `.gitignore`, `.env.example`, `.nvmrc`, `.npmrc`, `LICENSE`, `README.md`, `CONTRIBUTING.md`

- [ ] **Step 1: Initialize git + create root package.json**

```bash
cd /Users/arielfogelman/Desktop/agentgate-brasil
git init
```

Create `package.json`:

```json
{
  "name": "agentgate-brasil",
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "biome check .",
    "lint:fix": "biome check --write .",
    "format": "biome format --write .",
    "clean": "turbo run clean && rm -rf node_modules",
    "changeset": "changeset",
    "version-packages": "changeset version",
    "release": "turbo run build && changeset publish"
  },
  "devDependencies": {
    "@biomejs/biome": "^1.9.0",
    "@changesets/cli": "^2.27.0",
    "turbo": "^2.3.0",
    "typescript": "^5.7.0",
    "vitest": "^4.1.0"
  },
  "packageManager": "pnpm@9.15.0",
  "engines": {
    "node": ">=20"
  }
}
```

- [ ] **Step 2: Create pnpm-workspace.yaml**

```yaml
packages:
  - "packages/core/*"
  - "packages/features/**"
  - "packages/distributions/*"
  - "apps/*"
```

- [ ] **Step 3: Create turbo.json**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"]
    },
    "lint": {},
    "clean": {
      "cache": false
    }
  }
}
```

- [ ] **Step 4: Create tsconfig.base.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "composite": true,
    "isolatedModules": true,
    "outDir": "dist",
    "rootDir": "src"
  },
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 5: Create biome.json**

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.0/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "tab",
    "lineWidth": 120
  },
  "files": {
    "ignore": ["node_modules", "dist", ".turbo", ".next", "*.json"]
  }
}
```

- [ ] **Step 6: Create .gitignore, .env.example, .nvmrc, .npmrc**

`.gitignore`:
```
node_modules/
dist/
.turbo/
.env
.env.local
.DS_Store
*.tgz
.changeset/*.md
!.changeset/config.json
```

`.env.example`:
```
# AgentGate Brasil — Environment Variables
# Copy to .env and fill in values as needed

# Governance (optional — tools work without it)
# AGENTGATE_API_KEY=
# AGENTGATE_API_URL=https://api.agentgate.dev
```

`.nvmrc`:
```
v20.11.0
```

`.npmrc`:
```
public-hoist-pattern[]=*@types*
public-hoist-pattern[]=@biomejs/*
strict-peer-dependencies=false
```

- [ ] **Step 7: Create LICENSE, README.md, CONTRIBUTING.md**

`LICENSE`:
```
MIT License

Copyright (c) 2026 AgentGate (OZAV)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

`README.md`:
```markdown
# AgentGate Brasil

> The most comprehensive MCP server suite for AI agents operating in Brazil.

735 tools across 73 features: payments, fiscal, banking, logistics, government data, consumer services, and agentic commerce protocols — with built-in governance on every money-moving action.

**Open source. MIT licensed. Built by [OZAV](https://ozav.io).**

## Quick Start

```bash
npx @agentgate/brasil setup
```

## Documentation

- [docs.mcp.app.br](https://docs.mcp.app.br) (coming soon)

## License

MIT
```

`CONTRIBUTING.md`:
```markdown
# Contributing to AgentGate Brasil

Thank you for your interest in contributing! Full guidelines coming soon.

## Development

```bash
pnpm install
pnpm build
pnpm test
```

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
```

- [ ] **Step 8: Create .changeset/config.json**

```bash
mkdir -p .changeset
```

`.changeset/config.json`:
```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

- [ ] **Step 9: Create CI workflow**

`.github/workflows/ci.yml`:
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm build
      - run: pnpm test
```

- [ ] **Step 10: Create placeholder directories**

```bash
mkdir -p packages/core/discovery
mkdir -p packages/core/governance
mkdir -p packages/core/meta-tools
mkdir -p packages/core/generator
mkdir -p packages/features/_shared
mkdir -p packages/features/commerce/protocols/stripe-acp
mkdir -p packages/distributions
mkdir -p apps
touch packages/features/_shared/.gitkeep
```

- [ ] **Step 11: Install dependencies + verify**

```bash
pnpm install
```

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat: initialize pnpm monorepo with Turborepo, Biome, Vitest, Changesets"
```

---

### Task 2: `@agentgate/framework` — types + defineTool

**Files:**
- Create: `packages/core/framework/package.json`
- Create: `packages/core/framework/tsconfig.json`
- Create: `packages/core/framework/src/types.ts`
- Create: `packages/core/framework/src/tool.ts`
- Create: `packages/core/framework/src/index.ts`
- Create: `packages/core/framework/tests/tool.test.ts`

- [ ] **Step 1: Create package.json**

`packages/core/framework/package.json`:
```json
{
  "name": "@agentgate/framework",
  "version": "0.1.0",
  "description": "Core MCP framework with auto-registry for AgentGate Brasil",
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsc --build",
    "test": "vitest run",
    "test:watch": "vitest",
    "clean": "rm -rf dist tsconfig.tsbuildinfo"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.12.0",
    "zod": "^3.24.0"
  },
  "devDependencies": {
    "typescript": "^5.7.0",
    "vitest": "^4.1.0"
  },
  "license": "MIT"
}
```

- [ ] **Step 2: Create tsconfig.json with project references**

`packages/core/framework/tsconfig.json`:
```json
{
  "extends": "../../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

- [ ] **Step 3: Write failing test for defineTool**

`packages/core/framework/tests/tool.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { defineTool } from "../src/tool.js";
import { z } from "zod";

describe("defineTool", () => {
  it("creates a tool with name, description, and handler", () => {
    const tool = defineTool({
      name: "test_tool",
      description: "A test tool",
      inputSchema: z.object({
        value: z.string(),
      }),
      handler: async (input) => {
        return { result: input.value };
      },
    });

    expect(tool.name).toBe("test_tool");
    expect(tool.description).toBe("A test tool");
    expect(typeof tool.handler).toBe("function");
  });

  it("includes optional discovery metadata", () => {
    const tool = defineTool({
      name: "tagged_tool",
      description: "Tool with tags",
      descriptionPt: "Ferramenta com tags",
      inputSchema: z.object({}),
      discovery: {
        tags: ["payment", "pix"],
        keywords: ["pagar", "cobrar"],
      },
      handler: async () => ({ ok: true }),
    });

    expect(tool.descriptionPt).toBe("Ferramenta com tags");
    expect(tool.discovery?.tags).toContain("pix");
  });

  it("handler executes and returns result", async () => {
    const tool = defineTool({
      name: "echo",
      description: "Echoes input",
      inputSchema: z.object({ msg: z.string() }),
      handler: async (input) => ({ echo: input.msg }),
    });

    const result = await tool.handler({ msg: "hello" }, {} as any);
    expect(result).toEqual({ echo: "hello" });
  });
});
```

- [ ] **Step 4: Run test → should fail**

```bash
cd /Users/arielfogelman/Desktop/agentgate-brasil
pnpm install
cd packages/core/framework
npx vitest run tests/tool.test.ts
```

- [ ] **Step 5: Create types.ts**

`packages/core/framework/src/types.ts`:
```typescript
import type { z } from "zod";

/**
 * Discovery metadata for BM25 smart search.
 */
export interface ToolDiscovery {
  tags: string[];
  keywords: string[];
}

/**
 * A tool definition — the unit of functionality in AgentGate.
 */
export interface Tool<TInput = any, TOutput = any> {
  name: string;
  description: string;
  descriptionPt?: string;
  inputSchema: z.ZodType<TInput>;
  discovery?: ToolDiscovery;
  handler: ToolHandler<TInput, TOutput>;
}

/**
 * Tool execution context, passed to every handler.
 */
export interface ToolContext {
  env: Record<string, string | undefined>;
  governanceConfig?: GovernanceConfig;
  logger: Logger;
}

/**
 * Tool handler function signature.
 */
export type ToolHandler<TInput = any, TOutput = any> = (
  input: TInput,
  context: ToolContext,
) => Promise<TOutput>;

/**
 * Authentication configuration for a feature.
 */
export interface FeatureAuth {
  required: boolean;
  type: "bearer" | "basic" | "api_key" | "oauth2" | "none";
  envVars: string[];
}

/**
 * Governance configuration for a feature.
 * Lists which tools require AgentGate policy evaluation before execution.
 */
export interface FeatureGovernance {
  enabled: boolean;
  governedTools: string[];
}

/**
 * Feature metadata — the registration key for auto-discovery.
 * Every feature module exports a FEATURE_META conforming to this type.
 */
export interface FeatureMeta {
  id: string;
  name: string;
  category: "commerce" | "data" | "agentes";
  subcategory: string;
  description: string;
  descriptionPt: string;
  auth: FeatureAuth;
  governance: FeatureGovernance;
  tools: Tool[];
  discovery: ToolDiscovery;
  tags: string[];
  status: "ga" | "beta" | "alpha" | "deprecated";
}

/**
 * Governance configuration (provided by the user at runtime).
 */
export interface GovernanceConfig {
  apiKey: string;
  apiUrl: string;
}

/**
 * Logger interface.
 */
export interface Logger {
  info: (message: string, data?: Record<string, unknown>) => void;
  warn: (message: string, data?: Record<string, unknown>) => void;
  error: (message: string, data?: Record<string, unknown>) => void;
  debug: (message: string, data?: Record<string, unknown>) => void;
}
```

- [ ] **Step 6: Create tool.ts**

`packages/core/framework/src/tool.ts`:
```typescript
import type { Tool, ToolDiscovery, ToolHandler } from "./types.js";
import type { z } from "zod";

/**
 * Define a tool with type-safe input schema and handler.
 * This is the primary API for creating tools in AgentGate features.
 */
export function defineTool<TInput, TOutput>(config: {
  name: string;
  description: string;
  descriptionPt?: string;
  inputSchema: z.ZodType<TInput>;
  discovery?: ToolDiscovery;
  handler: ToolHandler<TInput, TOutput>;
}): Tool<TInput, TOutput> {
  return {
    name: config.name,
    description: config.description,
    descriptionPt: config.descriptionPt,
    inputSchema: config.inputSchema,
    discovery: config.discovery,
    handler: config.handler,
  };
}
```

- [ ] **Step 7: Create index.ts**

`packages/core/framework/src/index.ts`:
```typescript
export { defineTool } from "./tool.js";
export type {
  Tool,
  ToolContext,
  ToolHandler,
  ToolDiscovery,
  FeatureMeta,
  FeatureAuth,
  FeatureGovernance,
  GovernanceConfig,
  Logger,
} from "./types.js";
```

- [ ] **Step 8: Run test → should pass**

```bash
cd /Users/arielfogelman/Desktop/agentgate-brasil/packages/core/framework
npx vitest run tests/tool.test.ts
```

- [ ] **Step 9: Commit**

```bash
cd /Users/arielfogelman/Desktop/agentgate-brasil
git add packages/core/framework/
git commit -m "feat(framework): types, FeatureMeta, defineTool helper"
```

---

### Task 3: `@agentgate/framework` — auto-registry

**Files:**
- Create: `packages/core/framework/src/registry.ts`
- Create: `packages/core/framework/tests/registry.test.ts`

- [ ] **Step 1: Write failing test**

`packages/core/framework/tests/registry.test.ts`:
```typescript
import { describe, it, expect, beforeEach } from "vitest";
import { FeatureRegistry } from "../src/registry.js";
import type { FeatureMeta } from "../src/types.js";
import { z } from "zod";

const mockFeature: FeatureMeta = {
  id: "test-feature",
  name: "Test Feature",
  category: "commerce",
  subcategory: "br-payments",
  description: "A test feature for unit tests",
  descriptionPt: "Uma feature de teste para testes unitários",
  auth: {
    required: false,
    type: "none",
    envVars: [],
  },
  governance: {
    enabled: false,
    governedTools: [],
  },
  tools: [
    {
      name: "test_tool",
      description: "A test tool",
      inputSchema: z.object({ value: z.string() }),
      handler: async (input: { value: string }) => ({ result: input.value }),
    },
  ],
  discovery: {
    tags: ["test"],
    keywords: ["testing"],
  },
  tags: ["test"],
  status: "alpha",
};

describe("FeatureRegistry", () => {
  let registry: FeatureRegistry;

  beforeEach(() => {
    registry = new FeatureRegistry();
  });

  it("starts empty", () => {
    expect(registry.getAllFeatures()).toHaveLength(0);
    expect(registry.getAllTools()).toHaveLength(0);
  });

  it("registers a feature", () => {
    registry.register(mockFeature);
    expect(registry.getAllFeatures()).toHaveLength(1);
    expect(registry.getFeature("test-feature")).toEqual(mockFeature);
  });

  it("returns all tools across features", () => {
    registry.register(mockFeature);
    const tools = registry.getAllTools();
    expect(tools).toHaveLength(1);
    expect(tools[0].name).toBe("test_tool");
  });

  it("filters features by category", () => {
    registry.register(mockFeature);
    registry.register({ ...mockFeature, id: "data-feature", category: "data" });

    expect(registry.filterFeatures({ category: "commerce" })).toHaveLength(1);
    expect(registry.filterFeatures({ category: "data" })).toHaveLength(1);
  });

  it("filters features by include list", () => {
    registry.register(mockFeature);
    registry.register({ ...mockFeature, id: "other" });

    expect(registry.filterFeatures({ include: ["test-feature"] })).toHaveLength(1);
  });

  it("filters features by exclude list", () => {
    registry.register(mockFeature);
    registry.register({ ...mockFeature, id: "other" });

    expect(registry.filterFeatures({ exclude: ["test-feature"] })).toHaveLength(1);
    expect(registry.filterFeatures({ exclude: ["test-feature"] })[0].id).toBe("other");
  });

  it("rejects duplicate feature IDs", () => {
    registry.register(mockFeature);
    expect(() => registry.register(mockFeature)).toThrow("already registered");
  });
});
```

- [ ] **Step 2: Run test → should fail**

```bash
cd /Users/arielfogelman/Desktop/agentgate-brasil/packages/core/framework
npx vitest run tests/registry.test.ts
```

- [ ] **Step 3: Implement registry**

`packages/core/framework/src/registry.ts`:
```typescript
import type { FeatureMeta, Tool } from "./types.js";

/**
 * Feature registry — the central catalog of all registered features.
 *
 * Features register via FEATURE_META exports discovered at startup.
 * The registry provides filtering by category, include/exclude lists,
 * and aggregation of all tools across features.
 */
export class FeatureRegistry {
  private features: Map<string, FeatureMeta> = new Map();

  /**
   * Register a feature. Throws if a feature with the same ID already exists.
   */
  register(meta: FeatureMeta): void {
    if (this.features.has(meta.id)) {
      throw new Error(`Feature "${meta.id}" is already registered`);
    }
    this.features.set(meta.id, meta);
  }

  /**
   * Get all registered features.
   */
  getAllFeatures(): FeatureMeta[] {
    return Array.from(this.features.values());
  }

  /**
   * Get a single feature by ID.
   */
  getFeature(id: string): FeatureMeta | undefined {
    return this.features.get(id);
  }

  /**
   * Get all tools across all registered features.
   */
  getAllTools(): Tool[] {
    return this.getAllFeatures().flatMap((f) => f.tools);
  }

  /**
   * Filter features by category, include list, or exclude list.
   */
  filterFeatures(opts: {
    include?: string[];
    exclude?: string[];
    category?: string;
  }): FeatureMeta[] {
    let features = this.getAllFeatures();
    if (opts.include) {
      features = features.filter((f) => opts.include!.includes(f.id));
    }
    if (opts.exclude) {
      features = features.filter((f) => !opts.exclude!.includes(f.id));
    }
    if (opts.category) {
      features = features.filter((f) => f.category === opts.category);
    }
    return features;
  }

  /**
   * Get feature count.
   */
  get size(): number {
    return this.features.size;
  }
}
```

- [ ] **Step 4: Update index.ts exports**

Add to `packages/core/framework/src/index.ts`:
```typescript
export { FeatureRegistry } from "./registry.js";
```

- [ ] **Step 5: Run test → should pass**

```bash
cd /Users/arielfogelman/Desktop/agentgate-brasil/packages/core/framework
npx vitest run tests/registry.test.ts
```

- [ ] **Step 6: Commit**

```bash
cd /Users/arielfogelman/Desktop/agentgate-brasil
git add packages/core/framework/
git commit -m "feat(framework): FeatureRegistry with filtering and tool aggregation"
```

---

### Task 4: `@agentgate/framework` — logger + MCP server wrapper

**Files:**
- Create: `packages/core/framework/src/logger.ts`
- Create: `packages/core/framework/src/server.ts`
- Create: `packages/core/framework/tests/server.test.ts`

- [ ] **Step 1: Create logger**

`packages/core/framework/src/logger.ts`:
```typescript
import type { Logger } from "./types.js";

/**
 * Create a structured logger with a prefix.
 */
export function createLogger(prefix: string): Logger {
  return {
    info: (message, data) => console.log(JSON.stringify({ level: "info", prefix, message, ...data })),
    warn: (message, data) => console.warn(JSON.stringify({ level: "warn", prefix, message, ...data })),
    error: (message, data) => console.error(JSON.stringify({ level: "error", prefix, message, ...data })),
    debug: (message, data) => {
      if (process.env.DEBUG) {
        console.debug(JSON.stringify({ level: "debug", prefix, message, ...data }));
      }
    },
  };
}
```

- [ ] **Step 2: Write failing test for server**

`packages/core/framework/tests/server.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { createAgentGateServer } from "../src/server.js";
import { FeatureRegistry } from "../src/registry.js";
import { z } from "zod";
import type { FeatureMeta } from "../src/types.js";

const testFeature: FeatureMeta = {
  id: "test",
  name: "Test",
  category: "commerce",
  subcategory: "test",
  description: "Test feature",
  descriptionPt: "Feature de teste",
  auth: { required: false, type: "none", envVars: [] },
  governance: { enabled: false, governedTools: [] },
  tools: [
    {
      name: "echo",
      description: "Echoes input",
      inputSchema: z.object({ msg: z.string() }),
      handler: async (input: { msg: string }) => ({ echo: input.msg }),
    },
  ],
  discovery: { tags: ["test"], keywords: [] },
  tags: ["test"],
  status: "ga",
};

describe("createAgentGateServer", () => {
  it("creates a server with registered tools", () => {
    const registry = new FeatureRegistry();
    registry.register(testFeature);

    const server = createAgentGateServer({
      name: "test-server",
      version: "0.1.0",
      registry,
    });

    expect(server).toBeDefined();
    expect(server.registry.size).toBe(1);
  });

  it("accepts filter options", () => {
    const registry = new FeatureRegistry();
    registry.register(testFeature);
    registry.register({ ...testFeature, id: "other", category: "data" });

    const server = createAgentGateServer({
      name: "test-server",
      version: "0.1.0",
      registry,
      filter: { category: "commerce" },
    });

    expect(server).toBeDefined();
  });
});
```

- [ ] **Step 3: Run test → should fail**

```bash
cd /Users/arielfogelman/Desktop/agentgate-brasil/packages/core/framework
npx vitest run tests/server.test.ts
```

- [ ] **Step 4: Create server.ts**

`packages/core/framework/src/server.ts`:
```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import { FeatureRegistry } from "./registry.js";
import type { Tool, ToolContext, GovernanceConfig } from "./types.js";
import { createLogger } from "./logger.js";

export interface AgentGateServerConfig {
  name: string;
  version: string;
  registry: FeatureRegistry;
  filter?: {
    include?: string[];
    exclude?: string[];
    category?: string;
  };
  governanceConfig?: GovernanceConfig;
}

export interface AgentGateServer {
  registry: FeatureRegistry;
  start: () => Promise<void>;
}

/**
 * Create an AgentGate MCP server from a registry of features.
 */
export function createAgentGateServer(config: AgentGateServerConfig): AgentGateServer {
  const logger = createLogger(config.name);

  // Get filtered features and their tools
  const features = config.filter
    ? config.registry.filterFeatures(config.filter)
    : config.registry.getAllFeatures();

  const toolMap = new Map<string, Tool>();
  for (const feature of features) {
    for (const tool of feature.tools) {
      toolMap.set(tool.name, tool);
    }
  }

  const server = new Server(
    { name: config.name, version: config.version },
    { capabilities: { tools: {} } },
  );

  // List tools handler
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: Array.from(toolMap.values()).map((tool) => ({
        name: tool.name,
        description: tool.description,
        inputSchema: zodToJsonSchema(tool.inputSchema) as Record<string, unknown>,
      })),
    };
  });

  // Call tool handler
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const tool = toolMap.get(request.params.name);
    if (!tool) {
      throw new Error(`Tool not found: ${request.params.name}`);
    }

    const context: ToolContext = {
      env: process.env as Record<string, string | undefined>,
      governanceConfig: config.governanceConfig,
      logger,
    };

    try {
      const parsed = tool.inputSchema.parse(request.params.arguments);
      const result = await tool.handler(parsed, context);

      return {
        content: [
          {
            type: "text" as const,
            text: typeof result === "string" ? result : JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      logger.error("Tool execution failed", { tool: tool.name, error: message });
      return {
        content: [{ type: "text" as const, text: `Error: ${message}` }],
        isError: true,
      };
    }
  });

  return {
    registry: config.registry,
    start: async () => {
      const transport = new StdioServerTransport();
      await server.connect(transport);
      logger.info("Server started", {
        features: features.length,
        tools: toolMap.size,
      });
    },
  };
}
```

- [ ] **Step 5: Add zod-to-json-schema dependency**

Add to `packages/core/framework/package.json` dependencies:
```json
"zod-to-json-schema": "^3.24.0"
```

Then run `pnpm install` from root.

- [ ] **Step 6: Update index.ts exports**

Add to `packages/core/framework/src/index.ts`:
```typescript
export { createAgentGateServer } from "./server.js";
export type { AgentGateServerConfig, AgentGateServer } from "./server.js";
export { createLogger } from "./logger.js";
```

- [ ] **Step 7: Run all tests → should pass**

```bash
cd /Users/arielfogelman/Desktop/agentgate-brasil/packages/core/framework
npx vitest run
```

- [ ] **Step 8: Build the package**

```bash
cd /Users/arielfogelman/Desktop/agentgate-brasil
pnpm build
```

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat(framework): MCP server wrapper with stdio transport, logger"
```

---

### Task 5: Verify P0-A exit criteria

- [ ] **Step 1: Run full build from root**

```bash
cd /Users/arielfogelman/Desktop/agentgate-brasil
pnpm build
```
Expected: builds cleanly

- [ ] **Step 2: Run all tests**

```bash
pnpm test
```
Expected: all tests pass

- [ ] **Step 3: Verify monorepo structure**

```bash
ls packages/core/framework/dist/
```
Expected: compiled JS + declaration files

- [ ] **Step 4: Push to GitHub**

```bash
git remote add origin https://github.com/agentgate/agentgate-brasil.git
git push -u origin main
```

Note: GitHub org `agentgate` needs to be created first. If not ready, skip push.
