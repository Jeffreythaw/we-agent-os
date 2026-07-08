# Architecture v2 Overview

## 1. The Paradigm Shift
Phase 1 focused on the OS primitives: Kernel, IPC (Event Bus), Security (Policy/Approval), and the basic Agent/Tool interface. Architecture v2 introduces the **Cognitive and Organizational layers**.

## 2. New Topology
- **The Container**: The **Workspace** now encapsulates all state, identity, and capabilities.
- **The Brain**: The **Planner** and **Reasoner** provide dynamic graph generation and tactical routing.
- **The Workers**: **Agent Teams** adopt **Personas** and execute composable **Skills** via **Workflows**.
- **The Feedback Loop**: The **Learning System** proposes permanent optimizations based on execution traces.

## 3. Backward Compatibility
Architecture v2 is strictly additive. The Phase 1 Kernel remains the underlying orchestrator. The State Machine, Event Bus, Audit Logger, and Approval Gate still function exactly as before. V2 components simply act as higher-level managers feeding tasks into the Phase 1 execution engine.
