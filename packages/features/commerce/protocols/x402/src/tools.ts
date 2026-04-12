import { defineTool } from "@agentgate/framework";
import { withGovernance } from "@agentgate/governance";
import { X402Client } from "./client.js";
import { payResourceSchema, checkPriceSchema, getReceiptSchema, listPaymentsSchema } from "./schemas.js";

export const x402_pay_resource = defineTool({
  name: "x402_pay_resource",
  description: "Pay for a resource using the x402 stablecoin protocol. GOVERNED — pays USDC on-chain.",
  descriptionPt: "Paga por um recurso usando o protocolo x402 de stablecoins. GOVERNADO — paga USDC on-chain.",
  inputSchema: payResourceSchema,
  discovery: {
    tags: ["x402", "crypto", "stablecoin", "usdc", "payment", "coinbase"],
    keywords: ["pay resource", "x402 payment", "stablecoin", "pagar recurso"],
  },
  handler: async (input, context) => {
    const client = new X402Client(context.env);
    const priceCheck = await client.checkResource(input.url);

    if (!priceCheck.requiresPayment) {
      return { status: "free", message: "Resource does not require payment" };
    }

    const amount = priceCheck.amount || 0;
    if (input.max_amount !== undefined && amount > input.max_amount) {
      return { status: "too_expensive", amount, max_amount: input.max_amount };
    }

    return withGovernance(
      context.governanceConfig,
      {
        amount,
        currency: priceCheck.currency || "USDC",
        rail: "x402",
        counterparty: { id: priceCheck.recipient || input.url, name: input.url },
        category: "x402_resource_payment",
        description: `x402 payment for ${input.url}`,
      },
      async (authResult) => {
        const result = await client.payForResource(input.url, amount);

        return {
          success: result.success,
          amount,
          counterpartyId: priceCheck.recipient || input.url,
          railReference: result.txHash || result.paymentId,
          output: {
            payment_id: result.paymentId,
            tx_hash: result.txHash,
            amount,
            currency: priceCheck.currency,
            url: input.url,
          },
        };
      },
    );
  },
});

export const x402_check_price = defineTool({
  name: "x402_check_price",
  description: "Check if a URL requires x402 payment and what the price is.",
  descriptionPt: "Verifica se uma URL requer pagamento x402 e qual o preço.",
  inputSchema: checkPriceSchema,
  discovery: {
    tags: ["x402", "price", "check"],
    keywords: ["check price", "verificar preço", "x402 cost"],
  },
  handler: async (input, context) => {
    const client = new X402Client(context.env);
    return client.checkResource(input.url);
  },
});

export const x402_get_receipt = defineTool({
  name: "x402_get_receipt",
  description: "Get receipt for a previous x402 payment.",
  descriptionPt: "Busca recibo de um pagamento x402 anterior.",
  inputSchema: getReceiptSchema,
  discovery: {
    tags: ["x402", "receipt"],
    keywords: ["receipt", "recibo", "comprovante"],
  },
  handler: async (input) => {
    return { payment_id: input.payment_id, status: "confirmed", note: "Receipt lookup not implemented in v0.1" };
  },
});

export const x402_list_payments = defineTool({
  name: "x402_list_payments",
  description: "List recent x402 payments.",
  descriptionPt: "Lista pagamentos x402 recentes.",
  inputSchema: listPaymentsSchema,
  discovery: {
    tags: ["x402", "list", "payments"],
    keywords: ["list payments", "listar pagamentos"],
  },
  handler: async () => {
    return { payments: [], note: "Payment history not implemented in v0.1" };
  },
});

export const tools = [x402_pay_resource, x402_check_price, x402_get_receipt, x402_list_payments];
