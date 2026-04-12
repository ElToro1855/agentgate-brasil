import type { ApiManifest, GeneratedFile, ApiParam } from "./types.js";

function toToolName(featureId: string, endpointName: string): string {
  const prefix = featureId.replace(/-/g, "_");
  // Avoid double-prefix when endpoint name already begins with the full prefix.
  if (endpointName.startsWith(prefix + "_") || endpointName === prefix) {
    return endpointName;
  }
  // Also avoid double-prefix when the endpoint name already begins with a
  // trailing sub-segment of the feature prefix (e.g. endpoint "ucp_search"
  // already carries the meaningful part of feature id "google-ucp").
  const segments = prefix.split("_");
  for (let i = 1; i < segments.length; i++) {
    const trailingSuffix = segments.slice(i).join("_");
    if (endpointName.startsWith(trailingSuffix + "_") || endpointName === trailingSuffix) {
      // Prepend only the leading part that is not duplicated
      const leadingPart = segments.slice(0, i).join("_");
      return `${leadingPart}_${endpointName}`;
    }
  }
  return `${prefix}_${endpointName}`;
}

function zodType(param: ApiParam): string {
  switch (param.type) {
    case "number": return "z.number()";
    case "boolean": return "z.boolean()";
    case "object": return "z.record(z.unknown())";
    default: return "z.string()";
  }
}

function zodField(param: ApiParam): string {
  const base = zodType(param);
  const described = `${base}.describe("${param.description.replace(/"/g, '\\"')}")`;
  return param.required ? described : `${described}.optional()`;
}

/**
 * Generate a complete feature module from a manifest.
 */
export function generateFeature(manifest: ApiManifest): GeneratedFile[] {
  const files: GeneratedFile[] = [];
  const featureDir = `features/${manifest.category}/${manifest.subcategory}/${manifest.id}`;

  // constants.ts
  files.push({
    path: `${featureDir}/constants.ts`,
    content: `export const BASE_URL = "${manifest.baseUrl}";\nexport const FEATURE_ID = "${manifest.id}";\n`,
  });

  // schemas.ts
  const schemaExports: string[] = [];

  for (const ep of manifest.endpoints) {
    const allParams = [...(ep.params || []), ...(ep.body || [])];
    if (allParams.length === 0) continue;

    const schemaName = `${ep.name}Schema`;
    const fields = allParams.map((p) => `  ${p.name}: ${zodField(p)},`).join("\n");
    schemaExports.push(`export const ${schemaName} = z.object({\n${fields}\n});\n`);
  }

  files.push({
    path: `${featureDir}/schemas.ts`,
    content: `import { z } from "zod";\n\n${schemaExports.join("\n")}\n`,
  });

  // client.ts
  const authHeader = manifest.auth.type === "bearer"
    ? `"Authorization": \`Bearer \${this.apiKey}\``
    : manifest.auth.type === "api_key" && manifest.auth.headerName
    ? `"${manifest.auth.headerName}": this.apiKey`
    : manifest.auth.type === "basic"
    ? `"Authorization": \`Basic \${Buffer.from(this.apiKey).toString("base64")}\``
    : "";

  const envVar = manifest.auth.envVars[0] || "API_KEY";
  const clientMethods = manifest.endpoints.map((ep) => {
    const hasBody = ep.body && ep.body.length > 0;
    const pathParams = (ep.params || []).filter((p) => p.location === "path");
    const queryParams = (ep.params || []).filter((p) => p.location === "query");

    let pathExpr = `\`\${this.baseUrl}${ep.path}\``;
    for (const pp of pathParams) {
      pathExpr = pathExpr.replace(`{${pp.name}}`, `\${params.${pp.name}}`);
    }

    const bodyArg = hasBody ? `,\n      body: JSON.stringify(params)` : "";
    const queryStr = queryParams.length > 0
      ? `\n    const basePath = ${pathExpr};\n    const query = new URLSearchParams();\n${queryParams.map((q) => `    if (params.${q.name} !== undefined) query.set("${q.name}", String(params.${q.name}));`).join("\n")}\n    const url = \`\${basePath}?\${query}\`;`
      : `\n    const url = ${pathExpr};`;

    return `  async ${ep.name}(params: Record<string, any> = {}): Promise<any> {${queryStr}
    const res = await fetch(url, {
      method: "${ep.method}",
      headers: this.headers${bodyArg},
    });
    if (!res.ok) throw new Error(\`${manifest.name} API error: \${res.status}\`);
    return res.json();
  }`;
  }).join("\n\n");

  files.push({
    path: `${featureDir}/client.ts`,
    content: `export class ${manifest.name.replace(/[^a-zA-Z0-9]/g, "")}Client {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(env: Record<string, string | undefined>) {
    this.baseUrl = "${manifest.baseUrl}";
    this.apiKey = env.${envVar} || "";
    this.headers = {
      "Content-Type": "application/json",
      ${authHeader ? `${authHeader},` : ""}
    };
  }

${clientMethods}
}\n`,
  });

  // tools.ts
  const governedTools = new Set(manifest.governance?.governedTools || []);
  const toolDefs = manifest.endpoints.map((ep) => {
    const toolName = toToolName(manifest.id, ep.name);
    const allParams = [...(ep.params || []), ...(ep.body || [])];
    const schemaName = allParams.length > 0 ? `${ep.name}Schema` : "z.object({})";

    const schemaImport = allParams.length > 0 ? `${ep.name}Schema` : null;

    return {
      toolName,
      schemaImport,
      code: `export const ${toolName} = defineTool({
  name: "${toolName}",
  description: "${ep.description.replace(/"/g, '\\"')}",
  descriptionPt: "${ep.descriptionPt.replace(/"/g, '\\"')}",
  inputSchema: ${schemaName},
  discovery: {
    tags: ${JSON.stringify(manifest.tags)},
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new ${manifest.name.replace(/[^a-zA-Z0-9]/g, "")}Client(context.env);
    return client.${ep.name}(input);
  },
});`,
    };
  });

  const schemaImportsList = toolDefs
    .map((t) => t.schemaImport)
    .filter((s): s is string => s !== null);

  files.push({
    path: `${featureDir}/tools.ts`,
    content: `import { defineTool } from "@agentgate/framework";
import { z } from "zod";
${schemaImportsList.length > 0 ? `import { ${schemaImportsList.join(", ")} } from "./schemas.js";` : ""}
import { ${manifest.name.replace(/[^a-zA-Z0-9]/g, "")}Client } from "./client.js";

${toolDefs.map((t) => t.code).join("\n\n")}

export const tools = [${toolDefs.map((t) => t.toolName).join(", ")}];
`,
  });

  // index.ts (FEATURE_META)
  const governedToolNames = manifest.endpoints
    .filter((ep) => governedTools.has(ep.name) || ep.governed)
    .map((ep) => toToolName(manifest.id, ep.name));

  files.push({
    path: `${featureDir}/index.ts`,
    content: `import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "${manifest.id}",
  name: "${manifest.name}",
  category: "${manifest.category}",
  subcategory: "${manifest.subcategory}",
  description: "${manifest.description.replace(/"/g, '\\"')}",
  descriptionPt: "${manifest.descriptionPt.replace(/"/g, '\\"')}",
  auth: {
    required: ${manifest.auth.type !== "none"},
    type: "${manifest.auth.type}",
    envVars: ${JSON.stringify(manifest.auth.envVars)},
  },
  governance: {
    enabled: ${governedToolNames.length > 0},
    governedTools: ${JSON.stringify(governedToolNames)},
  },
  tools,
  discovery: {
    tags: ${JSON.stringify(manifest.tags)},
    keywords: [],
  },
  tags: ${JSON.stringify(manifest.tags)},
  status: "${manifest.status}",
};
`,
  });

  return files;
}
