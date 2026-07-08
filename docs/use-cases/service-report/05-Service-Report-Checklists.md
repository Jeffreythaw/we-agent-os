# Service Report Checklists

The Service Report QA process is modeled as a Checklist that enforces required bounds on the workflow facts.

## HarbourLink Routine Maintenance QA Checklist

- **Item 1 (FAIL)**
  - Label: Valid Contract Identifier
  - Rule: `rule_contract_id_format`
  - Required: `true`

- **Item 2 (FAIL)**
  - Label: Valid Service Date
  - Rule: `rule_service_date_valid`
  - Required: `true`

- **Item 3 (FAIL)**
  - Label: Missing Observations
  - Rule: `rule_has_observations`
  - Required: `true`

- **Item 4 (WARNING)**
  - Label: Missing Recommendations
  - Rule: `rule_has_recommendations`
  - Required: `false` (Routine reports may legitimately not have recommendations if no faults were found).

## Execution Behavior
If Item 1, 2, or 3 fails, the Checklist Engine returns `passed: false` and the workflow halts immediately.
If Item 4 fails, the engine registers a `warningCount: 1`, returns `passed: true`, and the workflow proceeds to template generation.
