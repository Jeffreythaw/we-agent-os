# 00: Architecture Index

Welcome to the WE Agent OS documentation. This index summarizes the core architectural components of the framework.

## Vision and Principles
- **[01-Vision.md](./01-Vision.md)**: Establishes the OS metaphor (Kernel, Processes, Device Drivers, File System, IPC).
- **[02-Principles.md](./02-Principles.md)**: Defines core tenets like OS strictness, security by default, and resilience via loop engineering.
- **[03-System-Architecture.md](./03-System-Architecture.md)**: Maps the high-level layers of the system.

## Agent Lifecycle and Execution
- **[04-Agent-Lifecycle.md](./04-Agent-Lifecycle.md)**: Details the states from Instantiation to Termination.
- **[06-Loop-Engineering.md](./06-Loop-Engineering.md)**: Explains the self-correcting `Plan -> Execute -> Check -> Improve` loop.
- **[11-Workflow-Engine.md](./11-Workflow-Engine.md)**: Describes the DAG-based task orchestration system for complex intents.
- **[13-State-Machine.md](./13-State-Machine.md)**: The strict deterministic controller for agent and task lifecycles.
- **[14-Scheduler.md](./14-Scheduler.md)**: The execution priority engine.

## Subsystems and Services
- **[05-Provider-System.md](./05-Provider-System.md)**: The routing abstraction for OpenAI, Claude, local models, etc.
- **[08-Tool-MCP-System.md](./08-Tool-MCP-System.md)**: The plugin model for native TypeScript tools and MCP servers.
- **[09-Memory-System.md](./09-Memory-System.md)**: The 4-tier storage abstraction (Skills, Working, Episodic, Semantic).
- **[12-Event-Bus.md](./12-Event-Bus.md)**: The PubSub IPC backbone for decoupled communication.
- **[15-Context-Manager.md](./15-Context-Manager.md)**: The subsystem responsible for LLM context window budgeting and chunking.
- **[16-Resource-Manager.md](./16-Resource-Manager.md)**: Tracks budgets, rate limits, and token caps.
- **[17-Capability-Registry.md](./17-Capability-Registry.md)**: The service discovery layer for tools and workflows.
- **[19-Observability.md](./19-Observability.md)**: Telemetry, metrics, and the immutable System Log.

## Security and Configuration
- **[07-Approval-System.md](./07-Approval-System.md)**: The asynchronous, 4-tier human-in-the-loop security gate.
- **[18-Policy-Engine.md](./18-Policy-Engine.md)**: The strict synchronous rule evaluation arm of the Approval System.
- **[20-Agent-Manifest.md](./20-Agent-Manifest.md)**: The declarative YAML standard for configuring agents.

## Implementation
- **[10-Project-Structure.md](./10-Project-Structure.md)**: Recommended directory layout.
- **[21-Implementation-Roadmap.md](./21-Implementation-Roadmap.md)**: Phase-by-phase execution plan.
- **[22-MVP-Scope.md](./22-MVP-Scope.md)**: Definitions of what is (and isn't) included in v1.
