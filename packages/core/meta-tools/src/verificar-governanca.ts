import { defineTool } from "@agentgate/framework";
import { z } from "zod";

export function createVerificarGovernanca() {
  return defineTool({
    name: "verificar_governanca",
    description: "Check governance status — whether AgentGate policy enforcement is active and budget information.",
    descriptionPt: "Verifica status da governança — se a aplicação de políticas AgentGate está ativa e informações de orçamento.",
    inputSchema: z.object({}),
    discovery: {
      tags: ["meta", "governance", "policy", "budget"],
      keywords: ["governança", "política", "orçamento", "governance", "policy", "budget"],
    },
    handler: async (_input, context) => {
      const config = context.governanceConfig;

      if (!config) {
        return {
          enabled: false,
          message: "Governance not configured. Tools execute without policy checks. Set governance_config to enable.",
          messagePt: "Governança não configurada. Ferramentas executam sem verificação de políticas. Configure governance_config para ativar.",
        };
      }

      return {
        enabled: true,
        api_url: config.apiUrl,
        message: "Governance is active. All governed tools will be evaluated against policies before execution.",
        messagePt: "Governança ativa. Todas as ferramentas governadas serão avaliadas contra políticas antes da execução.",
      };
    },
  });
}
