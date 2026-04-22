# Changelog

All notable changes to `@agentgate/mcp-mpp-tempo` are documented here. Follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] — 2026-04-21 (initial release)

First public release. MPP-Tempo client + two MCP tools for the AgentGate policy engine.

### Added

- `MppTempoClient.createPixPayout` — full response branching over `completed` / `processing` / `payment_required` / `failed`.
- `MppTempoClient.getChallengeStatus` — polls `/api/v1/challenges/{id}` for async settlement resolution (paid / refund_pending / escalation).
- `mpp_tempo_create_pix_payout` MCP tool with `withGovernance()` wrapping — policy engine evaluates every payout before the 402 is issued.
- `mpp_tempo_get_challenge_status` MCP tool.
- `PixRecipient` schema — recipient KYB fields (legal_name, tax_id, email, address, optional birth_date / incorporation_date) required by Lumx in live mode.
- Sandbox detection via API key prefix — `ag_sandbox_*` and `ag_test_*` default to the public sandbox endpoint and testnet Tempo.
- Regression tests:
  - Bug #8 — `"processing"` status must surface as `processing`, not `completed`.
  - Bug #9 — `recipient` KYB fields must be forwarded in the request body.

### Known limitations

- Live mode requires OZAV operator KYB approval and a mainnet Tempo wallet — see the go-live checklist at [agentic-payments-sage.vercel.app/docs/agentgate](https://agentic-payments-sage.vercel.app/docs/agentgate).
- Only PIX is live; other LatAm rails ship in future versions.
- No native retry/backoff loop — callers should drive polling themselves with a ≥2s interval and a cap around 30/min per challenge.
