# Workflow Engine

## 1. Purpose
The Workflow Engine acts as the central orchestrator that breaks down high-level, complex user requests into smaller, actionable tasks and constructs an execution graph for the WE Agent OS Kernel.

## 2. Responsibilities
- Deconstruct user intents into discrete tasks.
- Identify dependencies between tasks (e.g., Task B requires output from Task A).
- Construct a Directed Acyclic Graph (DAG) for execution.
- Monitor workflow progression and trigger downstream tasks upon upstream completion.

## 3. Inputs and Outputs
- **Inputs**: High-level user prompts, workflow templates, global system constraints.
- **Outputs**: An execution graph (DAG) of actionable agent tasks, workflow status events, aggregated final responses.

## 4. Core Concepts
- **Execution Graph (DAG)**: The structural map of tasks and their dependencies.
- **Sub-tasks**: Granular, single-responsibility actions.
- **Parallelism**: Independent tasks that can be scheduled concurrently.

## 5. Interfaces/Contracts at High Level
- `createWorkflow(prompt: string): WorkflowGraph`
- `updateTaskStatus(taskId: string, status: TaskStatus): void`
- `getNextExecutableTasks(workflowId: string): Task[]`

## 6. Failure Handling
- If a critical task fails and exhausts its retries, the engine must halt dependent tasks and surface the error.
- Supports alternative pathing (if Task A fails, execute Fallback Task A-prime).

## 7. Best Practices
- Keep tasks atomic and focused to maximize the chance of success.
- Use explicit inputs/outputs between nodes rather than relying on implicit global state.

## 8. Risks and Anti-patterns
- **Anti-pattern**: Creating massive, monolithic tasks that cannot be parallelized.
- **Risk**: Cyclical dependencies causing a deadlock in the DAG resolution.

## 9. Relationship with other WE Agent OS Components
- Submits ready tasks to the **Scheduler** for execution.
- Uses the **Event Bus** to broadcast workflow progression.
- Consults the **Capability Registry** to ensure the system has the right tools to fulfill the generated tasks.
