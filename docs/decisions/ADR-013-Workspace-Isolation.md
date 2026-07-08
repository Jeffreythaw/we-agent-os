# ADR 013: Workspace Isolation

## Status
Accepted

## Context
As the system handles multiple distinct projects for a user, cross-contamination of memory, secrets, and policies becomes a critical security and context-pollution risk.

## Decision
All state (Personas, Skills, Workflows, Memory, Policies, Secrets) is strictly bound to a "Workspace". The OS Kernel enforces this boundary.

## Consequences
- **Pros**: Strong security, clear mental model for users, prevents hallucinations caused by mixed contexts.
- **Cons**: Sharing knowledge between workspaces requires explicit, deliberate bridging mechanisms.
