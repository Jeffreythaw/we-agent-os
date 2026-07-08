# ADR 002: Mixed Provider Router

## Status
Accepted

## Context
Relying on a single LLM provider (e.g., only OpenAI) introduces single points of failure, vendor lock-in, and cost inefficiencies. Different tasks require different models (e.g., local Llama for simple data extraction, Claude 3.5 Sonnet for complex coding).

## Decision
Implement a Provider Router abstraction in the Kernel. The router will dynamically select the LLM Provider based on task requirements, cost constraints, and user configuration. Supported providers include OpenAI, OpenRouter, Gemini, Claude, Ollama, and LM Studio.

## Consequences
- **Positive**: Cost efficiency, privacy options (local models), and vendor independence.
- **Negative**: Increased complexity in standardizing tool calling and structured output across different provider APIs.
