import { defineTool } from "@agentgate/framework";
import { withGovernance } from "@agentgate/governance";
import { MppTempoClient } from "./client.js";
import {
  createPixPayoutSchema,
  getChallengeStatusSchema,
} from "./schemas.js";

export const mpp_tempo_create_pix_payout = defineTool({
  name: "mpp_tempo_create_pix_payout",
  description:
    "Send BRL via PIX to a Brazilian bank account, settled by the agent paying pathUSD on Tempo. Uses the Machine Payments Protocol (HTTP 402). GOVERNED — requires policy approval for production keys.",
  descriptionPt:
    "Envia BRL via PIX para conta bancária brasileira, liquidado pelo pagamento do agente em pathUSD na Tempo. Usa o Machine Payments Protocol (HTTP 402). GOVERNADO — requer aprovação de política para chaves de produção.",
  inputSchema: createPixPayoutSchema,
  discovery: {
    tags: [
      "mpp",
      "tempo",
      "pix",
      "brazil",
      "brl",
      "payment",
      "stablecoin",
      "agentic",
      "ozav",
    ],
    keywords: [
      "send pix",
      "transfer brl",
      "pagar pix",
      "transferir reais",
      "pix payout",
      "agent pix",
      "mpp tempo pix",
    ],
  },
  handler: async (input, context) => {
    return withGovernance(
      context.governanceConfig,
      {
        amount: input.amount_brl,
        currency: "BRL",
        rail: "mpp-tempo",
        counterparty: {
          id: `pix:${input.pix_key}`,
          name: input.beneficiary_name || "PIX recipient",
        },
        category: "agentic_commerce",
        description:
          input.reference ||
          `PIX payout: R$${input.amount_brl} to ${input.pix_key}`,
      },
      async (authResult) => {
        const client = new MppTempoClient(context.env);
        try {
          const result = await client.createPixPayout({
            pix_key: input.pix_key,
            amount_brl: input.amount_brl,
            beneficiary_name: input.beneficiary_name,
            reference: authResult.txId
              ? `${input.reference || ""} agentgate:${authResult.txId}`.trim()
              : input.reference,
            recipient: input.recipient,
          });

          if (result.status === "completed") {
            return {
              success: true,
              amount: input.amount_brl,
              counterpartyId: `pix:${input.pix_key}`,
              railReference: result.pixTransactionId,
              output: {
                pix_transaction_id: result.pixTransactionId,
                amount_brl: result.amountBrl,
                exchange_rate: result.exchangeRate,
                amount_usdc_charged: result.amountUsdcCharged,
                receipt: result.receipt,
                simulated: result.simulated,
                hint: result.simulated
                  ? "Running against sandbox/testnet — no real PIX was sent."
                  : undefined,
              } as never,
            };
          }

          // Live mode async settlement: submitted to Lumx, webhook will
          // finalize. Surface to the agent as a SUCCESS so governance
          // commits the spend; the agent polls getChallengeStatus if it
          // needs the settled endToEndId.
          if (result.status === "processing") {
            return {
              success: true,
              amount: input.amount_brl,
              counterpartyId: `pix:${input.pix_key}`,
              railReference: result.pixTransactionId,
              output: {
                pix_transaction_id: result.pixTransactionId,
                amount_brl: result.amountBrl,
                exchange_rate: result.exchangeRate,
                amount_usdc_charged: result.amountUsdcCharged,
                receipt: result.receipt,
                status: "processing",
                poll_url: result.pollUrl,
                hint: "PIX submitted to Lumx. Settlement is asynchronous; poll poll_url or use mpp_tempo_get_challenge_status for the settled endToEndId.",
              } as never,
            };
          }

          if (result.status === "payment_required") {
            return {
              success: false,
              amount: 0,
              counterpartyId: `pix:${input.pix_key}`,
              railReference: result.challengeId,
              output: {
                challenge_id: result.challengeId,
                www_authenticate: result.challengeHeader,
                hint: result.hint,
              } as never,
              error:
                "Payment required — sign the Tempo challenge and retry. Use the `mppx` client SDK to handle this automatically.",
            };
          }

          return {
            success: false,
            amount: 0,
            counterpartyId: `pix:${input.pix_key}`,
            railReference: "",
            output: { error_code: result.errorCode } as never,
            error: result.error,
          };
        } catch (error) {
          return {
            success: false,
            amount: 0,
            counterpartyId: `pix:${input.pix_key}`,
            railReference: "",
            output: null as never,
            error: error instanceof Error ? error.message : String(error),
          };
        }
      },
    );
  },
});

export const mpp_tempo_get_challenge_status = defineTool({
  name: "mpp_tempo_get_challenge_status",
  description:
    "Retrieve the current status of an MPP challenge (pending, paid, expired, or pending_human_review for escalations).",
  descriptionPt:
    "Busca o status atual de um challenge MPP (pendente, pago, expirado, ou pending_human_review para escalações).",
  inputSchema: getChallengeStatusSchema,
  discovery: {
    tags: ["mpp", "tempo", "challenge", "status", "polling"],
    keywords: ["challenge status", "check challenge", "mpp status"],
  },
  handler: async (input, context) => {
    const client = new MppTempoClient(context.env);
    return client.getChallengeStatus(input.challenge_id);
  },
});

export const tools = [
  mpp_tempo_create_pix_payout,
  mpp_tempo_get_challenge_status,
];
