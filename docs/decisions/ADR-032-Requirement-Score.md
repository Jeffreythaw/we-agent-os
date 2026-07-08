# ADR 032: Requirement Score & Definition of Ready

## Status
Accepted

## Context
We need an objective, deterministic way to decide when the Discovery phase is "done". Relying on an LLM to decide if it "understands enough" is subjective and violates our AI-optional, Workflow-First principles.

## Decision
We will implement a quantitative `Requirement Score` (0-100). Projects must achieve a strict Definition of Ready (DoR) threshold (e.g., Core requirement rules passed = 100%) before transitioning out of the Business Analysis layer.

## Consequences
- **Pros**: Deterministic, testable readiness criteria. Checklists and Rules engines can evaluate the score mathematically without LLM calls.
- **Cons**: Requires mapping out strict completion rules for various project archetypes.
