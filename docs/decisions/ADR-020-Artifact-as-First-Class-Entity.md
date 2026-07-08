# ADR 020: Artifact as First-Class Entity

## Status
Accepted

## Context
Agents produce files, text, and media. Treating these simply as "logs" or "tool outputs" diminishes their importance to the user.

## Decision
Artifacts are first-class entities with metadata, versioning, and explicit ownership tied to a Project.

## Consequences
- **Pros**: Easy to build UIs that show "Files Generated".
- **Cons**: Requires a dedicated Artifact Engine.
