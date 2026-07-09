---
status: accepted
date: 2026-07-09
---
# ADR 0006: Local Agent First Principle

## Context
As WE Agent OS grows, we need clear boundaries regarding the usage of external AI orchestration (like Claude or GPT) vs. our own internal tools during the development and runtime lifecycle.

## Decision
- WE Agent OS strictly prefers its own local agents, skills, workflows, specifications, and deterministic tools.
- External AI tools are designated as development assistants only.
- External AI may be used ONLY when local agents cannot resolve the task, or if the user explicitly approves its usage.
- Production execution must absolutely not depend on external AI providers unless explicitly documented and approved by an ADR or RFC.

## Consequences
- The platform remains highly deterministic and controllable.
- Over-reliance on magic LLM behaviors is mitigated, forcing explicit prompt engineering and workflow design.