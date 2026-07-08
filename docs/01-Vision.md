# Vision: WE Agent OS

WE Agent OS is a TypeScript-based Agent Orchestration Framework designed for running personal agents for various work tasks. It reimagines the agent framework through the lens of a traditional Operating System.

## The OS Metaphor

- **Main Orchestrator = Kernel**: The core loop that schedules, manages, and routes work.
- **Personal Agents = Processes**: Individual agents instantiated to perform specific tasks, each with its own context.
- **Tools / MCP = Device Drivers**: Standardized interfaces allowing agents to interact with external systems, APIs, and the local environment.
- **Memory = File System**: Long-term and short-term state management, utilizing skills and memory blocks.
- **Messages = IPC (Inter-Process Communication)**: Standardized message passing between the Kernel, Agents, and Sub-agents.
- **Approval = Permission System**: A robust gating mechanism protecting sensitive actions.
- **Audit Log = System Log**: Comprehensive, append-only logs tracking agent actions, decisions, and system events.
- **Loop Engineering = Scheduler / Feedback Controller**: The execution engine that plans, verifies, and improves task execution iteratively.
