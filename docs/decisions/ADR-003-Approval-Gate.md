# ADR 003: Asynchronous Approval Gate

## Status
Accepted

## Context
Agents executing tasks autonomously can be dangerous if they have unconstrained access to the filesystem, network, or external APIs (e.g., sending emails, dropping databases).

## Decision
Implement a 4-tier Permission System (Approval Gate). 
- Level 1: Read (Allow)
- Level 2: Write (Session Allow)
- Level 3: Destructive (Per-action prompt)
- Level 4: Critical (Multi-factor prompt)
When an agent hits a Level 3 or 4 gate, the Kernel suspends the process and waits asynchronously for a user IPC response.

## Consequences
- **Positive**: Guarantees safety and builds user trust. Prevents runaway agent bills or data loss.
- **Negative**: Interrupts full autonomy. Requires a robust mechanism to suspend and resume agent processes without losing context.
