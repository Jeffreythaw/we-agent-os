# ADR 019: Workspace -> Project -> Persona Hierarchy

## Status
Accepted

## Context
We need a way to organize work for different clients or goals within the same OS installation.

## Decision
Implement a strict hierarchy: Workspace contains Projects. Projects contain Personas. Global assets (Skills/Tools) sit at the Workspace level.

## Consequences
- **Pros**: Matches real-world agency/freelance organization patterns.
- **Cons**: Adds a layer of indirection to simple single-task setups.
