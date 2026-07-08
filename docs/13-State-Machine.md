# State Machine

## 1. Purpose
The State Machine rigorously controls the lifecycle states of Tasks and Agent Processes within the WE Agent OS, ensuring that no component enters an invalid or zombie state.

## 2. Responsibilities
- Maintain the current state of all active agents and workflows.
- Enforce valid state transitions (e.g., preventing an `INITIALIZING` agent from skipping to `COMPLETED`).
- Handle transitions caused by external interrupts (e.g., transitioning from `RUNNING` to `SUSPENDED` upon an approval request).

## 3. Inputs and Outputs
- **Inputs**: Transition requests, timeout signals, event bus notifications.
- **Outputs**: State change confirmations, transition rejected errors, entry/exit hook triggers.

## 4. Core Concepts
- **Nodes/States**: `PENDING`, `INITIALIZING`, `RUNNING`, `SUSPENDED`, `WAITING_FOR_USER`, `COMPLETED`, `FAILED`.
- **Transitions**: Defined paths between nodes.
- **Guards**: Conditions that must be met before a transition is allowed.

## 5. Interfaces/Contracts at High Level
- `transition(entityId: string, action: Action): State`
- `getCurrentState(entityId: string): State`
- `registerHook(state: State, callback: (entity: string) => void): void`

## 6. Failure Handling
- If an invalid transition is attempted, the State Machine throws an error and retains the current state.
- If an agent crashes abruptly, the State Machine forces a transition to the `FAILED` state to ensure resources are released.

## 7. Best Practices
- Define states explicitly rather than relying on boolean flags (e.g., use `state: 'SUSPENDED'` rather than `isSuspended: true`).
- Keep the State Machine deterministic.

## 8. Risks and Anti-patterns
- **Anti-pattern**: Allowing components to mutate state directly bypassing the State Machine's transition logic.
- **Risk**: Deadlocks if agents get stuck in `SUSPENDED` without a timeout or resumption trigger.

## 9. Relationship with other WE Agent OS Components
- Controlled via the **Event Bus**.
- Determines what the **Scheduler** is allowed to execute (only `PENDING` or `RUNNING` tasks).
- Interacts with the **Policy Engine** when moving into states that require human intervention.
