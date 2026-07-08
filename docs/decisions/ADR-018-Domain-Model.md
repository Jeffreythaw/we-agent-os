# ADR 018: Domain Model

## Status
Accepted

## Context
A unified domain model is required to ensure all engines and developers share a common vocabulary.

## Decision
We adopt the 15 core entities (Workspace, Project, Persona, Agent, Skill, Workflow, Task, Execution, Tool, Provider, Memory, Policy, Approval, Artifact, Knowledge) as the definitive domain model.

## Consequences
- **Pros**: Crystal clear boundaries and terminology.
- **Cons**: Requires refactoring early prototypes that blur these lines.
