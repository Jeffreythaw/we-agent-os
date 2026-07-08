# ADR 009: Split Agent Manifests

## Status
Accepted

## Context
Defining an agent strictly in TypeScript code makes it difficult for non-engineers to tweak prompts or add tools. Conversely, putting everything (config, prompts, rules) into a single giant string makes parsing and validation difficult.

## Decision
Split agent definitions into a directory structure: a structural `manifest.yaml` for configuration (tools, models), a `prompt.md` for natural language instructions, and a `skills/` folder for specific standard operating procedures.

## Consequences
- **Positive**: Clean separation of concerns. Easy validation of `manifest.yaml` using schemas. Better developer experience for prompt engineering.
- **Negative**: Requires disk I/O to load a single agent and slightly more complex loading logic in the Registry.
