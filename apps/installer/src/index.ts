#!/usr/bin/env node

import { intro, outro, select, text, confirm, isCancel, spinner } from "@clack/prompts";
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { join } from "path";

async function main() {
  intro("🇧🇷 AgentGate Brasil Setup");

  // 1. Detect MCP client
  const client = await select({
    message: "Qual cliente MCP você usa?",
    options: [
      { value: "claude-desktop", label: "Claude Desktop" },
      { value: "claude-code", label: "Claude Code (CLI)" },
      { value: "cursor", label: "Cursor" },
      { value: "other", label: "Outro" },
    ],
  });
  if (isCancel(client)) return;

  // 2. Choose distribution
  const distribution = await select({
    message: "O que você quer instalar?",
    options: [
      { value: "brasil-lite", label: "🆓 Brasil Lite — APIs públicas sem autenticação (BrasilAPI, Bacen, IBGE, Câmara, Senado)" },
      { value: "brasil", label: "🇧🇷 Brasil Completo — todas as features + governança" },
      { value: "custom", label: "⚙️  Custom — escolher features individualmente" },
    ],
  });
  if (isCancel(distribution)) return;

  // 3. Governance
  let governanceKey = "";
  const useGovernance = await confirm({
    message: "Ativar governança AgentGate? (recomendado para produção)",
    initialValue: false,
  });
  if (isCancel(useGovernance)) return;

  if (useGovernance) {
    const key = await text({
      message: "AgentGate API Key (deixe vazio para tier gratuito)",
      placeholder: "ag_live_...",
    });
    if (isCancel(key)) return;
    governanceKey = (key as string) || "";
  }

  // 4. Generate config
  const s = spinner();
  s.start("Gerando configuração...");

  const packageName = distribution === "brasil-lite"
    ? "@agentgate/brasil-lite"
    : "@agentgate/brasil";

  const mcpConfig: Record<string, unknown> = {
    command: "npx",
    args: [packageName],
  };

  if (governanceKey) {
    mcpConfig.env = {
      AGENTGATE_API_KEY: governanceKey,
      AGENTGATE_API_URL: "https://api.agentgate.dev",
    };
  }

  // 5. Write config based on client
  if (client === "claude-desktop") {
    const configDir = join(
      process.env.HOME || "~",
      "Library",
      "Application Support",
      "Claude"
    );

    if (!existsSync(configDir)) {
      mkdirSync(configDir, { recursive: true });
    }

    const configPath = join(configDir, "claude_desktop_config.json");
    let existingConfig: Record<string, unknown> = {};

    try {
      const raw = readFileSync(configPath, "utf-8");
      existingConfig = JSON.parse(raw);
    } catch {
      // No existing config
    }

    const mcpServers = (existingConfig.mcpServers as Record<string, unknown>) || {};
    mcpServers["agentgate-brasil"] = mcpConfig;
    existingConfig.mcpServers = mcpServers;

    writeFileSync(configPath, JSON.stringify(existingConfig, null, 2));
    s.stop("Configuração salva!");

    outro(`✅ Pronto! Reinicie o Claude Desktop e diga: "liste as features AgentGate Brasil disponíveis"`);

  } else if (client === "claude-code") {
    s.stop("Configuração gerada!");

    console.log("\nAdicione ao Claude Code com:");
    console.log(`\n  claude mcp add agentgate-brasil -- npx ${packageName}\n`);

    if (governanceKey) {
      console.log("Com governança:");
      console.log(`\n  AGENTGATE_API_KEY=${governanceKey} claude mcp add agentgate-brasil -- npx ${packageName}\n`);
    }

    outro("✅ Pronto! Reinicie o Claude Code e teste com: /mcp");

  } else {
    s.stop("Configuração gerada!");

    console.log("\nAdicione esta configuração MCP ao seu cliente:");
    console.log(JSON.stringify({ "agentgate-brasil": mcpConfig }, null, 2));

    outro("✅ Pronto! Reinicie seu cliente MCP e teste.");
  }
}

main().catch(console.error);
