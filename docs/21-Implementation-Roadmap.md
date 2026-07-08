# Implementation Roadmap

This document outlines the step-by-step implementation order for the WE Agent OS.

## Phase 1: Core Foundation (Next)
The immediate next phase focuses on establishing the core skeleton and the essential IPC/Security loops.
1. **Project Config**: Finalize `package.json`, TypeScript config, ESLint, and testing frameworks.
2. **CLI Skeleton**: Basic Commander.js entry point.
3. **Kernel Skeleton**: The central class that initializes the OS components.
4. **Agent Manifest Loader**: YAML parsing and Zod validation for agent configurations.
5. **State Machine**: The deterministic lifecycle controller.
6. **Event Bus**: The core PubSub IPC system.
7. **Audit Logger**: Basic observability (writing logs to disk).
8. **Policy Engine**: Synchronous rule evaluation (Allow/Deny).
9. **Approval Gate**: Asynchronous CLI prompts for human-in-the-loop permission.
10. **Basic Tool Interface**: The base class/Zod schema for Device Drivers.

## Phase 2: Execution Engine
- Provider Router (OpenAI/Local stubs).
- Context Manager (Basic token counting).
- Scheduler and Loop Engineering (Plan -> Execute).

## Phase 3: Capabilities & Memory
- Capability Registry.
- MCP Client integration.
- Working Memory and Episodic Memory to local disk.

## Phase 4: Workflows
- DAG Workflow Engine.
- Resource Manager (Rate limits/Budgets).
