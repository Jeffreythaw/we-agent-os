# Event Bus

## 1. Purpose
The Event Bus serves as the primary Inter-Process Communication (IPC) backbone for the WE Agent OS, facilitating asynchronous message passing between agents, tools, the workflow engine, the approval system, and the audit system.

## 2. Responsibilities
- Route messages between decoupled system components.
- Ensure guaranteed delivery (or explicit failure) of system events.
- Broadcast global events (e.g., system shutdown, user interrupt).
- Serialize and deserialize payloads across process boundaries.

## 3. Inputs and Outputs
- **Inputs**: Raw event payloads from any system component (e.g., `AgentSpawned`, `ApprovalRequested`, `TaskCompleted`).
- **Outputs**: Dispatched events to subscribed listeners via callbacks or message queues.

## 4. Core Concepts
- **Topics/Channels**: Logical groupings of events (e.g., `system.*`, `agent.123.*`).
- **Publish/Subscribe (PubSub)**: The asynchronous communication pattern.
- **Payloads**: Strongly typed (Zod validated) JSON objects representing the event.

## 5. Interfaces/Contracts at High Level
- `publish(topic: string, payload: EventPayload): void`
- `subscribe(topicPattern: string, handler: EventHandler): Subscription`
- `request(topic: string, payload: EventPayload): Promise<Response>` (for RPC-like synchronous calls over IPC)

## 6. Failure Handling
- Events that fail to process are pushed to a Dead Letter Queue (DLQ) for inspection.
- The Event Bus must not crash the Kernel if a subscriber throws an error.

## 7. Best Practices
- Treat events as immutable historical facts.
- Keep payloads lightweight; pass references (IDs) to large data stored in the Memory System rather than embedding megabytes of text.

## 8. Risks and Anti-patterns
- **Anti-pattern**: Using the Event Bus for tight-loop, synchronous, blocking operations.
- **Risk**: Event storms causing high memory consumption and latency if subscribers cannot process messages fast enough.

## 9. Relationship with other WE Agent OS Components
- Triggers the **State Machine** on agent lifecycle events.
- Delivers logs directly to the **Observability** system.
- Acts as the bridge between Agent Processes and the Kernel's **Policy Engine**.
