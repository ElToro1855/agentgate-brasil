/**
 * A manifest describes an API in a simple YAML format
 * that the generator uses to produce a feature module.
 */
export interface ApiManifest {
  id: string;
  name: string;
  category: "commerce" | "data" | "agentes";
  subcategory: string;
  description: string;
  descriptionPt: string;
  baseUrl: string;
  auth: {
    type: "bearer" | "basic" | "api_key" | "none";
    envVars: string[];
    headerName?: string;
  };
  governance?: {
    governedTools: string[];
  };
  tags: string[];
  status: "ga" | "beta" | "alpha";
  endpoints: ApiEndpoint[];
}

export interface ApiEndpoint {
  name: string;
  description: string;
  descriptionPt: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  governed?: boolean;
  params?: ApiParam[];
  body?: ApiParam[];
  response?: {
    description: string;
  };
}

export interface ApiParam {
  name: string;
  type: "string" | "number" | "boolean" | "object";
  required: boolean;
  description: string;
  location?: "path" | "query" | "header";
}

export interface GeneratedFile {
  path: string;
  content: string;
}
