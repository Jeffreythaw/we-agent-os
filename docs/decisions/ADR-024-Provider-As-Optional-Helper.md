# ADR 024: Provider as Optional Helper

## Status
Accepted

## Context
The Provider Engine (OpenAI, Ollama, etc.) was previously considered the "Brain" of the OS.

## Decision
Downgrade the Provider Engine from "Core Brain" to an "Optional Helper." It is a peripheral service invoked by the core engines (Workflow/Skill) only when strictly necessary.

## Consequences
- **Pros**: Decouples the OS from the rapid churn of the AI model ecosystem.
- **Cons**: The OS must gracefully handle workflows where the provider is entirely disabled.
