# System Architecture

The WE Agent OS architecture is separated into distinct layers, ensuring clear separation of concerns.

## 1. Kernel (Main Orchestrator)
The central nervous system. It handles:
- Instantiating and terminating Agent Processes.
- Routing IPC (Inter-Process Communication) messages.
- Managing the global execution loop and Scheduler.
- Enforcing the Permission System.

## 2. Process Space (Personal Agents)
Agents are spawned by the Kernel to handle specific tasks. 
- Each process has its own isolated context and memory space.
- Processes communicate with the Kernel via standard IPC interfaces.

## 3. Device Drivers (Tools & MCP)
Extensions that provide Agents with capabilities.
- **Standard Tools**: Built-in TypeScript functions (e.g., `fs.readFile`).
- **MCP (Model Context Protocol)**: External server integrations providing dynamic capabilities and context.

## 4. File System (Memory & Skills)
The persistent state layer.
- **Working Memory**: Short-term context for the current process.
- **Long-term Memory**: Persistent vector or key-value storage.
- **Skill Files**: Markdown/YAML files dictating standard operating procedures (SOPs) for specific tasks.

## 5. Permission System (Approval Gate)
Intersects all calls from the Process Space to the Device Drivers, enforcing read/write/delete permissions based on the user's configuration.

## 6. System Log (Audit Log)
An immutable ledger recording the lifecycle of all processes, tool executions, and state changes.
