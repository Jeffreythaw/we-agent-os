# Execution System

## 1. Concept
An Execution is the immutable runtime history of a process. Every time the user asks the OS to do something, an Execution is created.

## 2. Characteristics
- **Immutable**: Once written, execution logs cannot be altered.
- **Traceable**: Contains references to every Task, Agent, Provider, and Tool used.
- **Resumable**: If a system crashes, the State Machine can read the Execution history and resume from the last known good state.
