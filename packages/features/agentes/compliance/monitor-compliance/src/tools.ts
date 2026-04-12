import { defineTool } from "@agentgate/framework";
import { z } from "zod";
import { check_entitySchema, generate_reportSchema, list_alertsSchema } from "./schemas.js";
import { MonitorComplianceClient } from "./client.js";

export const monitor_compliance_check_entity = defineTool({
  name: "monitor_compliance_check_entity",
  description: "Run compliance checks on a company (sanctions, lawsuits, tax status)",
  descriptionPt: "Executa verificações de compliance em uma empresa (sanções, processos, situação fiscal)",
  inputSchema: check_entitySchema,
  discovery: {
    tags: ["agent","compliance","monitoring","governance","risk","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new MonitorComplianceClient(context.env);
    return client.check_entity(input);
  },
});

export const monitor_compliance_generate_report = defineTool({
  name: "monitor_compliance_generate_report",
  description: "Generate a compliance report for an entity",
  descriptionPt: "Gera relatório de compliance para uma entidade",
  inputSchema: generate_reportSchema,
  discovery: {
    tags: ["agent","compliance","monitoring","governance","risk","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new MonitorComplianceClient(context.env);
    return client.generate_report(input);
  },
});

export const monitor_compliance_list_alerts = defineTool({
  name: "monitor_compliance_list_alerts",
  description: "List compliance alerts and risk signals",
  descriptionPt: "Lista alertas de compliance e sinais de risco",
  inputSchema: list_alertsSchema,
  discovery: {
    tags: ["agent","compliance","monitoring","governance","risk","brazil"],
    keywords: [],
  },
  handler: async (input, context) => {
    const client = new MonitorComplianceClient(context.env);
    return client.list_alerts(input);
  },
});

export const tools = [monitor_compliance_check_entity, monitor_compliance_generate_report, monitor_compliance_list_alerts];
