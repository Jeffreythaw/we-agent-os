# ADR 023: Workflow-First, AI-Optional

## Status
Accepted

## Context
Relying entirely on LLMs for all decision-making results in high latency, high costs, non-deterministic behavior, and unnecessary privacy risks. 

## Decision
Shift the architectural focus to "Workflow-First, AI-Optional." The Workflow and Skill Engines become the primary intelligence layer, relying on deterministic execution.

## Consequences
- **Pros**: Drastically reduces costs and latency. Vastly improves reliability and testability. Enables offline local execution.
- **Cons**: Requires developers to build explicit workflow DAGs and rules rather than relying on a "smart prompt" to figure everything out magically.
