# ADR 031: Discovery-First Paradigm

## Status
Accepted

## Context
Historically, LLMs tend to eagerly generate code or specifications based on heavily underspecified prompts, leading to high failure rates and misaligned expectations. We need a mechanism to prevent premature execution.

## Decision
We enforce a "Discovery-First" paradigm. The OS is forbidden from generating a `PROJECT_SPEC` or executing project-building workflows until a formal Discovery phase is completed and approved.

## Consequences
- **Pros**: Drastically reduces hallucination and misaligned code generation. Enforces structured requirements gathering.
- **Cons**: Increases time-to-first-code. Requires a robust Question Engine to interact with the user before execution begins.
