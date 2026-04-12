import { defineTool } from "@agentgate/framework";
import { withGovernance } from "@agentgate/governance";
import { StripeAcpClient } from "./client.js";
import {
  createPaymentIntentSchema,
  confirmPaymentIntentSchema,
  getPaymentIntentSchema,
  listPaymentIntentsSchema,
} from "./schemas.js";

export const stripe_acp_create_payment_intent = defineTool({
  name: "stripe_acp_create_payment_intent",
  description: "Creates a Stripe PaymentIntent for agentic commerce. GOVERNED — requires policy approval for production use.",
  descriptionPt: "Cria um Stripe PaymentIntent para comércio agentic. GOVERNADO — requer aprovação de política para uso em produção.",
  inputSchema: createPaymentIntentSchema,
  discovery: {
    tags: ["stripe", "payment", "acp", "commerce", "credit-card"],
    keywords: ["create payment", "cobrar", "stripe charge", "payment intent"],
  },
  handler: async (input, context) => {
    return withGovernance(
      context.governanceConfig,
      {
        amount: input.amount / 100, // Convert cents to dollars for governance
        currency: input.currency ?? "usd",
        rail: "stripe-acp",
        counterparty: {
          id: "stripe-payment",
          name: input.description || "Stripe ACP Payment",
        },
        category: "agentic_commerce",
        description: input.description ?? "Stripe ACP PaymentIntent",
      },
      async (authResult) => {
        const client = new StripeAcpClient(context.env);

        const metadata = input.metadata ?? {};
        if (authResult.token) {
          metadata.agentgate_tx_id = authResult.txId!;
          metadata.agentgate_token = authResult.token;
        }

        try {
          const result = await client.createPaymentIntent({
            amount: input.amount,
            currency: input.currency ?? "usd",
            description: input.description,
            metadata,
          });

          return {
            success: result.status !== "canceled",
            amount: input.amount / 100,
            counterpartyId: "stripe-payment",
            railReference: result.id,
            output: {
              payment_intent_id: result.id,
              status: result.status,
              amount: result.amount,
              currency: result.currency,
              client_secret: result.client_secret,
            },
          };
        } catch (error) {
          return {
            success: false,
            amount: 0,
            counterpartyId: "",
            railReference: "",
            output: null as any,
            error: error instanceof Error ? error.message : String(error),
          };
        }
      },
    );
  },
});

export const stripe_acp_confirm_payment_intent = defineTool({
  name: "stripe_acp_confirm_payment_intent",
  description: "Confirms a Stripe PaymentIntent to complete the payment.",
  descriptionPt: "Confirma um Stripe PaymentIntent para completar o pagamento.",
  inputSchema: confirmPaymentIntentSchema,
  discovery: {
    tags: ["stripe", "payment", "confirm", "acp"],
    keywords: ["confirm payment", "confirmar pagamento"],
  },
  handler: async (input, context) => {
    const client = new StripeAcpClient(context.env);
    return client.confirmPaymentIntent(input.payment_intent_id, input.payment_method);
  },
});

export const stripe_acp_get_payment_intent = defineTool({
  name: "stripe_acp_get_payment_intent",
  description: "Retrieves details of a Stripe PaymentIntent by ID.",
  descriptionPt: "Busca detalhes de um Stripe PaymentIntent pelo ID.",
  inputSchema: getPaymentIntentSchema,
  discovery: {
    tags: ["stripe", "payment", "get", "status"],
    keywords: ["get payment", "buscar pagamento", "payment status"],
  },
  handler: async (input, context) => {
    const client = new StripeAcpClient(context.env);
    return client.getPaymentIntent(input.payment_intent_id);
  },
});

export const stripe_acp_list_payment_intents = defineTool({
  name: "stripe_acp_list_payment_intents",
  description: "Lists recent Stripe PaymentIntents with optional pagination.",
  descriptionPt: "Lista Stripe PaymentIntents recentes com paginação opcional.",
  inputSchema: listPaymentIntentsSchema,
  discovery: {
    tags: ["stripe", "payment", "list"],
    keywords: ["list payments", "listar pagamentos", "recent payments"],
  },
  handler: async (input, context) => {
    const client = new StripeAcpClient(context.env);
    return client.listPaymentIntents({ limit: input.limit, starting_after: input.starting_after });
  },
});

export const tools = [
  stripe_acp_create_payment_intent,
  stripe_acp_confirm_payment_intent,
  stripe_acp_get_payment_intent,
  stripe_acp_list_payment_intents,
];
