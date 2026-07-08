# ADR 017: Learning System with Policy Approval

## Status
Accepted

## Context
An OS should improve over time by observing failures and human corrections. However, autonomous self-modification is a severe security risk.

## Decision
The Learning System operates in the background, synthesizing execution traces into proposed optimizations (new Skills, better prompts). Crucially, it cannot silently mutate the Workspace; all optimizations must pass through the Phase 1 Approval Gate.

## Consequences
- **Pros**: Continuous improvement with a strict human-in-the-loop safety net.
- **Cons**: Requires advanced trace analysis and diff-generation tooling.
