# ADR 005: DAG-Based Workflow Engine

## Status
Accepted

## Context
Complex user intents (e.g., "research a company, write a report, and email it") cannot be handled efficiently by a single agent prompting loop. Executing these steps sequentially wastes time if tasks can be done in parallel.

## Decision
Implement a Directed Acyclic Graph (DAG) Workflow Engine. User intents will be parsed into nodes (tasks) and edges (dependencies). 

## Consequences
- **Positive**: Enables parallel execution of independent sub-tasks, drastically reducing total time-to-completion.
- **Negative**: Increases orchestration complexity and requires a robust method for passing context between DAG nodes.
