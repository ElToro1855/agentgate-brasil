import { defineTool } from "@agentgate/framework";
import { get_cnpj_detailsSchema } from "./schemas.js";
import { ReceitaFederalClient } from "./client.js";

export const receita_federal_get_cnpj_details = defineTool({
  name: "receita_federal_get_cnpj_details",
  description: "Get detailed CNPJ company data from Receita Federal",
  descriptionPt: "Busca dados detalhados de empresa por CNPJ na Receita Federal",
  inputSchema: get_cnpj_detailsSchema,
  discovery: {
    tags: ["receita-federal", "cnpj", "cpf", "tax", "identity", "brazil", "free"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new ReceitaFederalClient(context.env);
    return client.get_cnpj_details(input);
  },
});

export const tools = [receita_federal_get_cnpj_details];
