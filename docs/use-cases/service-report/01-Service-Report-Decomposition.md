# Service Report Decomposition Overview

## Context
The original `we-service-report-skill-v2` was designed as a monolithic skill. Under the new Workflow-First paradigm, monolithic skills are an anti-pattern. They tightly couple input validation, domain knowledge, formatting, and external integrations, making them hard to test, audit, and reuse across different engineering contracts.

## Decomposition Strategy
To align with the Agent OS architecture, the monolithic Service Report generator is decomposed into the following discrete primitives:

1. **Workflow (`02-Service-Report-Workflow.md`)**: The orchestrator that chains together rules, checklists, and templates sequentially.
2. **Skills (`03-Service-Report-Skills.md`)**: The functional wrappers (`system.rule_check`, `system.checklist_check`, `system.template_render`) that execute the steps.
3. **Rules (`04-Service-Report-Rules.md`)**: Deterministic assertions (e.g., "Technician Name exists", "Photo Count >= 2").
4. **Checklists (`05-Service-Report-Checklists.md`)**: Groupings of rules mapping to strict `FAIL` (required) and `WARNING` (optional) quality assurance gates.
5. **Templates (`06-Service-Report-Templates.md`)**: The Markdown skeleton that receives verified data to deterministically generate the final report text.
6. **Knowledge Pack (`07-Service-Report-Knowledge-Pack.md`)**: The WE Engineering standards decoupled from the execution code.
7. **MVP Scope (`08-Service-Report-MVP-Scope.md`)**: Strict constraints to prevent feature creep during initial implementation.

## Benefits
- **Reusability**: Rules and Checklists can be shared with future audit workflows.
- **Auditability**: If a report fails generation, the Audit Logger will record exactly which deterministic rule tripped.
- **AI-Optional**: The entire routine report generation requires zero LLM tokens.
