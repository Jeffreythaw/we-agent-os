# ADR 030: Skill-First Service Contract

## Status
Accepted

## Context
In previous phases, we built the Deterministic Rule Engine, Checklist Engine, and Template Engine. We also built a mini Workflow Runner that executed these directly. However, having the Workflow Runner execute raw rules creates tight coupling and limits extensibility. We need a standard unit of execution.

## Decision
Introduce "Skills" as the primary service contract for all execution. Workflows will no longer call the Rule Engine directly; instead, workflows will invoke Skills, and Skills will use the underlying engines as needed.

## Consequences
- **Pros**:
  - Unifies the execution interface for the Workflow Runner.
  - Allows easy introduction of new engines without rewriting the Workflow Runner.
  - Enforces stateless execution and predictable error handling (no throwing for domain logic).
  - Integrates smoothly with the AI Escalation Policy and Approval Gate.
- **Cons**:
  - Adds a layer of indirection (Workflow -> Skill -> Engine).
  - Requires migrating existing direct engine calls (e.g., `rule_check`) into dedicated internal skills (e.g., `SystemRuleCheckSkill`).
