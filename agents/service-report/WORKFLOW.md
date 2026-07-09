# Workflow Definition

The deterministic execution workflow is decoupled from the agent pack and is defined at:
`workflows/service-report/harbourlink-routine-service.workflow.json`

This JSON file is consumed directly by the `WorkflowRunner` engine.

## Section Skills Integration
The workflow mathematically enforces the rules and checklists defined by the individual section-level skills found in `agents/service-report/skills/`.
