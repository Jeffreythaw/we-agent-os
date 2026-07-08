# ADR 035: Knowledge Precedes Engine (Data-Driven OS)

## Status
Accepted

## Context
As the WE Agent OS scales to handle diverse domains (e.g., Service Reports, Software Engineering, Audits), the core Engines (Discovery, Question, Rule, Template) risk becoming tightly coupled to specific business logic. Hardcoding domain rules inside the OS kernel or execution loops makes the system rigid, unscalable, and difficult to test.

## Decision
We mandate a strictly **Data-Driven Architecture**: "Knowledge Precedes Engine".
1. Core OS Engines must remain mathematically pure, domain-agnostic execution environments.
2. All business logic, rules, question catalogs, checklists, and templates must be abstracted into decoupled, JSON/Markdown-based **Knowledge Packs**.
3. Engines will dynamically mount and interpret these packs at runtime.

## Consequences
- **Pros**: 
  - True multi-tenant OS capability. The exact same OS binary can run a Civil Engineering Audit or bootstrap a React application simply by loading a different Knowledge Pack.
  - Domain experts can author Knowledge Packs without writing TypeScript code.
- **Cons**:
  - Requires defining and maintaining strict JSON schemas for the Knowledge Pack structure to ensure the Engines parse them correctly.
