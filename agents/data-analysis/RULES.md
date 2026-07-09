# Rules

These rules are enforced by the `RuleEngine` during validation:

### Common Rules
1. `analysisCategory` MUST exist.
2. `analysisCategory` MUST match one of: `TEMPERATURE_LOGGER`, `CHILLER_TREND`, `WATER_TEST`, `EXCEL_SUMMARY`.
3. `datasetId` MUST exist.

### Water Test Specific Rules
1. `pH_level` MUST exist.
2. `conductivity` MUST exist.
