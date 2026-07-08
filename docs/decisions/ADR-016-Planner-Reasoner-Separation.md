# ADR 016: Planner and Reasoner Separation

## Status
Accepted

## Context
Transforming a user request into execution requires both strategic breakdown and tactical routing. Combining these stresses a single LLM call.

## Decision
Separate the cognitive load into two distinct components:
1. **Planner**: Focuses entirely on logic, breakdown, and graph generation.
2. **Reasoner**: Focuses entirely on tactical optimization (provider selection, cost vs. speed tradeoffs, error recovery strategies).

## Consequences
- **Pros**: More focused LLM prompts, better accuracy, ability to swap out Reasoner logic without breaking the Planner.
- **Cons**: Slight latency increase due to chained cognitive steps.
