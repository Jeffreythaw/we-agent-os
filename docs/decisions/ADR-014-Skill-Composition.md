# ADR 014: Skill Composition

## Status
Accepted

## Context
Hardcoding agent capabilities leads to duplication and brittle code.

## Decision
Adopt a system of reusable "Skills" representing atomic standard operating procedures. Skills are declarative and decoupled from the agents that execute them.

## Consequences
- **Pros**: Users can easily share, compose, and version-control Skills.
- **Cons**: Requires a robust parsing and validation engine (Manifest Loader extension).
