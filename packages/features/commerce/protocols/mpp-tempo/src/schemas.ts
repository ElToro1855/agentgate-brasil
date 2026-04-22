import { z } from "zod";

export const pixRecipientSchema = z.object({
  legal_name: z.string().describe("Legal name of the recipient holder."),
  tax_id: z
    .string()
    .describe("CPF (11 digits) or CNPJ (14 digits), no punctuation."),
  email: z.string().email().describe("Recipient contact email."),
  holder_type: z
    .enum(["INDIVIDUAL", "BUSINESS"])
    .optional()
    .describe("Defaults to INDIVIDUAL."),
  holder_relationship: z
    .enum([
      "SELF",
      "HOLDING_COMPANY",
      "SUBSIDIARY_COMPANY",
      "BRANCH_OFFICE",
      "BUSINESS_PARTNER",
      "SUPPLIER",
      "CUSTOMER",
      "CREDITOR",
      "DEBTOR",
      "FRANCHISEE",
      "FRIEND",
      "RELATIVE",
      "EMPLOYEE",
    ])
    .optional()
    .describe("Relationship to the agent's principal. Defaults to CUSTOMER."),
  address: z.object({
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string().describe("ISO-2 country code, e.g. 'BR'."),
  }),
  birth_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .describe("YYYY-MM-DD. Required for INDIVIDUAL in some Lumx flows."),
  incorporation_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .describe("YYYY-MM-DD. Required for BUSINESS holders."),
});

export const createPixPayoutSchema = z.object({
  pix_key: z
    .string()
    .describe(
      "PIX key (CPF, CNPJ, email, phone, or random/EVP). The destination for the BRL transfer.",
    ),
  amount_brl: z
    .number()
    .min(0.5)
    .describe("Amount in BRL (reais). Minimum 0.50, maximum 500,000."),
  beneficiary_name: z
    .string()
    .optional()
    .describe("Optional beneficiary display name; shown on the PIX receipt."),
  reference: z
    .string()
    .optional()
    .describe("Optional free-text reference (invoice id, memo, etc)."),
  recipient: pixRecipientSchema
    .optional()
    .describe(
      "Recipient KYB fields. REQUIRED when the bridge runs in live mode (AGENTGATE_PIX_MODE=live) because Lumx KYBs each bank account on creation. Ignored in sandbox/simulate mode.",
    ),
});

export const getChallengeStatusSchema = z.object({
  challenge_id: z
    .string()
    .describe(
      "Challenge ID from a 402 response or a previous payout request (e.g. u_abc123...).",
    ),
});
