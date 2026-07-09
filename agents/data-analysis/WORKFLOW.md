# Workflow Definition

The deterministic execution workflows are decoupled from the agent pack and defined at:
- `workflows/data-analysis/temperature-logger.workflow.json`
- `workflows/data-analysis/chiller-trend.workflow.json`
- `workflows/data-analysis/water-test.workflow.json`
- `workflows/data-analysis/excel-summary.workflow.json`

These JSON files are consumed directly by the `WorkflowRunner` engine.
