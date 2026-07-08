# Workflow: HarbourLink Routine Contract Service Report

## Overview
This workflow defines the sequential execution pipeline required to take raw technician field data and produce a WE Engineering compliant Service Report for the HarbourLink routine maintenance contract.

## Execution Steps

### Step 1: Input Validation
- **Skill**: `system.rule_check`
- **Purpose**: Verify that the inbound data payload contains all fundamental structural requirements (Contract ID, Date, Technician Name).
- **On Failure**: Abort workflow (FATAL).

### Step 2: Quality Assurance (QA) Checklist
- **Skill**: `system.checklist_check`
- **Purpose**: Enforce WE Engineering quality standards on the data (e.g., minimum photo count, valid asset IDs).
- **On Failure**: 
  - Required item fails: Abort workflow (FATAL).
  - Optional item fails: Log `WARNING`, continue.

### Step 3: Document Generation
- **Skill**: `system.template_render`
- **Purpose**: Inject the verified facts and variables into the WE Engineering standard report markdown template.
- **On Failure**: Log missing variable warnings, output artifact.

## Output
A single `WorkflowArtifact` representing the rendered markdown Service Report.
