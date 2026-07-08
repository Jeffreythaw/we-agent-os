# ADR 010: MVP Boundary

## Status
Accepted

## Context
"Scope creep" is the biggest risk for an agent framework. Attempting to build parallel multi-agent DAG execution, vector databases, and full MCP support simultaneously will result in a bloated, unstable v1.

## Decision
We define a strict Minimum Viable Product (MVP) boundary focusing entirely on a single-agent Loop Engineering flow. Features like Workflow Engines, Vector Databases, and Web UIs are explicitly excluded from Phase 1.

## Consequences
- **Positive**: Rapid time-to-market. Forces focus on the most critical challenge: making a single agent reliable and secure via the Policy Engine and Scheduler.
- **Negative**: Early versions will not support complex parallel tasks, which may limit the immediate impressiveness of the framework.
