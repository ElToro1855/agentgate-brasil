import { defineTool } from "@agentgate/framework";
import { validate_cpfSchema, get_cnpjSchema } from "./schemas.js";
import { SERPROClient } from "./client.js";

export const serpro_validate_cpf = defineTool({
  name: "serpro_validate_cpf",
  description: "Validate a CPF and get holder data",
  descriptionPt: "Valida um CPF e busca dados do titular",
  inputSchema: validate_cpfSchema,
  discovery: {
    tags: ["serpro", "cpf", "cnpj", "government", "identity", "brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new SERPROClient(context.env);
    return client.validate_cpf(input);
  },
});

export const serpro_get_cnpj = defineTool({
  name: "serpro_get_cnpj",
  description: "Get CNPJ details from official source",
  descriptionPt: "Busca detalhes de CNPJ na fonte oficial",
  inputSchema: get_cnpjSchema,
  discovery: {
    tags: ["serpro", "cpf", "cnpj", "government", "identity", "brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new SERPROClient(context.env);
    return client.get_cnpj(input);
  },
});

export const tools = [serpro_validate_cpf, serpro_get_cnpj];
