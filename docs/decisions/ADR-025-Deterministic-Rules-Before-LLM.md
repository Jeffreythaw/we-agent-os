# ADR 025: Deterministic Rules Before LLM

## Status
Accepted

## Context
Agents often hallucinate or fail when tasked with verifying simple state or generating boilerplate.

## Decision
Implement strict Deterministic Rule, Checklist, and Template engines. These must always be evaluated *before* falling back to an LLM.

## Consequences
- **Pros**: Predictable execution, easier debugging.
- **Cons**: Increases the amount of initial configuration and tooling required to set up a Workspace.
