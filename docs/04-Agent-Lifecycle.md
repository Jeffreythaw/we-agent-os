# Agent Lifecycle

An Agent in WE Agent OS acts as an isolated Process. Its lifecycle is strictly managed by the Kernel.

## 1. Instantiation (Fork/Exec)
- The user or a parent Agent requests a new Agent process.
- The Kernel loads the Agent's blueprint (Markdown/YAML skill file).
- A fresh context is allocated in the Memory System.

## 2. Initialization (Boot)
- The Agent process requests specific Tool/MCP permissions (Device Drivers).
- The Kernel validates the request against the Approval System.
- System prompt and initial context are injected.

## 3. Execution (The Scheduler Loop)
- The Agent enters the Loop Engineering cycle.
- Receives events via IPC.
- Interacts with the environment via Device Drivers.
- Yields control back to the Kernel when waiting for user input or long-running tasks.

## 4. Suspension (Sleep)
- If waiting for an Approval System gate or external event, the Kernel suspends the process.
- State is flushed to the File System (Memory).

## 5. Termination (Kill)
- **Graceful Exit**: The task is marked complete, output is returned via IPC, and resources are freed.
- **Forced Exit**: The Kernel terminates the process due to a timeout, infinite loop, or security violation.
