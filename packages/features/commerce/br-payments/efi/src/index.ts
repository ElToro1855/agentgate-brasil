import type { FeatureMeta } from "@agentgate/framework";
import { tools } from "./tools.js";

export const FEATURE_META: FeatureMeta = {
  id: "efi",
  name: "EFI",
  category: "commerce",
  subcategory: "br-payments",
  description: "EFI (Gerencianet) — Pix, boleto, cards, open finance",
  descriptionPt: "EFI (Gerencianet) — Pix, boleto, cartões, open finance",
  auth: {
    required: true,
    type: "bearer",
    envVars: ["EFI_CLIENT_ID","EFI_CLIENT_SECRET"],
  },
  governance: {
    enabled: true,
    governedTools: ["efi_create_pix_charge"],
  },
  tools,
  discovery: {
    tags: ["payments","pix","boleto","gerencianet","brazil"],
    keywords: [],
  },
  tags: ["payments","pix","boleto","gerencianet","brazil"],
  status: "beta",
};
