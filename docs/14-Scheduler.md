# Scheduler

## 1. Purpose
The Scheduler is the execution engine of the Kernel. It decides what task or agent runs next based on priority, risk, cost, deadlines, and dependency readiness, effectively managing CPU and LLM resources.

## 2. Responsibilities
- Evaluate the pool of pending tasks.
- Rank tasks based on a multifaceted priority algorithm.
- Allocate execution slots to agents.
- Handle preemption (pausing a low-priority task for a high-priority user interrupt).

## 3. Inputs and Outputs
- **Inputs**: Task definitions, resource availability from the Resource Manager, task priorities.
- **Outputs**: Execution commands dispatching agents to run, context-switches.

## 4. Core Concepts
- **Tick**: The fundamental evaluation cycle of the Scheduler.
- **Priority Queue**: The ordered list of tasks awaiting execution.
- **Yielding**: When an agent voluntarily gives up execution time (e.g., while waiting for a network request).

## 5. Interfaces/Contracts at High Level
- `enqueue(task: Task, options: SchedulingOptions): void`
- `tick(): void`
- `preempt(taskId: string): void`

## 6. Failure Handling
- If a scheduled task hangs, the Scheduler enforces timeouts and forces the agent to yield or terminate.
- Re-queues tasks that fail due to transient Resource Manager limits (e.g., rate limits).

## 7. Best Practices
- Implement backoff algorithms for tasks that continuously fail or hit rate limits.
- Prioritize user-facing conversational replies over background research tasks.

## 8. Risks and Anti-patterns
- **Anti-pattern**: Busy-waiting. Agents should explicitly yield instead of polling the Scheduler.
- **Risk**: Starvation, where low-priority tasks never execute because high-priority tasks constantly flood the queue.

## 9. Relationship with other WE Agent OS Components
- Reads dependency readiness from the **Workflow Engine**.
- Checks resource limits with the **Resource Manager**.
- Checks valid task states via the **State Machine**.
