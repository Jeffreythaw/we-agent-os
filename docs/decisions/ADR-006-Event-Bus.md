# ADR 006: Asynchronous Event Bus for IPC

## Status
Accepted

## Context
As the OS metaphor implies decoupled components (Kernel, Agents, Tools), relying on synchronous function calls creates tight coupling, makes the system brittle to errors, and complicates tracing.

## Decision
Adopt a PubSub Event Bus as the primary Inter-Process Communication (IPC) mechanism. All state changes, logs, and commands must flow through the Event Bus as strongly-typed payloads.

## Consequences
- **Positive**: High decoupling. Easy to attach new listeners (e.g., an external websocket server for a UI) without modifying core code.
- **Negative**: Harder to trace synchronous execution flows; requires explicit correlation IDs for debugging.
