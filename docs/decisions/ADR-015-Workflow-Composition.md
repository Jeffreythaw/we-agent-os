# ADR 015: Workflow Composition

## Status
Accepted

## Context
Complex tasks require more than a single atomic skill.

## Decision
Introduce a Workflow Composer that links atomic Skills into Directed Acyclic Graphs (DAGs), enabling sequential, parallel, and conditional execution paths.

## Consequences
- **Pros**: Enables highly complex, deterministic automation.
- **Cons**: Requires adding DAG scheduling capabilities to the Kernel's primitive Phase 1 linear scheduler.
