# ADR 007: Explicit State Machine for Lifecycle

## Status
Accepted

## Context
Agent processes can hang, wait for user input indefinitely, or crash unexpectedly. Relying on simple boolean flags (e.g., `isRunning`, `isPaused`) leads to race conditions and invalid states (e.g., an agent being both running and suspended).

## Decision
Implement a strict, deterministic State Machine to govern the lifecycle of Agents and Tasks. Valid states and transitions are hardcoded.

## Consequences
- **Positive**: Eliminates zombie processes and race conditions. Provides clear entry/exit hooks for memory management.
- **Negative**: Adds boilerplate code when adding new edge-case states.
