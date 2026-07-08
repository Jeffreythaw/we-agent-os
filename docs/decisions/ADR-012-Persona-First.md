# ADR 012: Persona is Not an Agent

## Status
Accepted

## Context
In early designs, "Agent" often conflated the execution process with the identity/prompt. This led to monolithic, inflexible agent definitions.

## Decision
We separate "Persona" (identity, tone, expertise) from "Agent" (the OS process that executes tasks). An Agent is a generic runtime container that *adopts* a Persona.

## Consequences
- **Pros**: High reusability. A single codebase/workflow can be run under different personas without redefining the logic.
- **Cons**: Slightly more complex boot sequence for the Kernel.
