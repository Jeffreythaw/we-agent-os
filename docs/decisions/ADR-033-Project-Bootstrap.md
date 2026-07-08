# ADR 033: Project Bootstrap Workflow

## Status
Accepted

## Context
Initializing a new project (creating scaffolding, specs, and initial configurations) requires a sequence of validations, checks, and file generation.

## Decision
Project Bootstrapping will be modeled entirely as a standard OS Workflow (the `Project Bootstrap Workflow`). It will utilize `system.rule_check`, `system.checklist_check`, and `system.template_render` skills just like any other domain workflow.

## Consequences
- **Pros**: Eliminates "magic" hardcoded initialization scripts. Leverages our robust Workflow Runner. Fully auditable and AI-optional.
- **Cons**: Bootstrapping must conform strictly to the WorkflowInput schema constraints.
