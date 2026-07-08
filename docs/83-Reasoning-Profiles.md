# Reasoning Profiles

## Definition
A Reasoning Profile is a distinct analytical lens applied to a problem. Instead of monolithic subagents, Profiles are lightweight configuration objects.

## Schema Attributes
- `id`: Unique identifier (e.g., `hat_black`, `swot_threats`).
- `name`: Human-readable name.
- `focus`: A strict directive of what this profile cares about (e.g., "Identify vulnerabilities, risks, and failure modes").
- `constraints`: Boundaries for the output (e.g., "Do not propose solutions, only list problems").
- `rules`: Array of deterministic `RuleEngine` facts that must be true for this profile to pass locally.
- `escalation_allowed`: Boolean indicating if this profile is permitted to invoke an LLM.

## AI-Optional Implementation
By defining `rules`, a profile can be entirely deterministic. For example, a "Compliance Profile" might simply assert that `data_encryption == true` via a checklist, returning its structured output in 5 milliseconds without invoking OpenAI.
