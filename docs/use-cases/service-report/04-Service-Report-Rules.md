# Service Report Deterministic Rules

These rules define the lowest level of boolean assertions for the HarbourLink Routine Service Report.

## Core Rules

1. **rule_contract_id_exists**
   - Fact: `contract_id`
   - Operator: `exists`
   - Severity: `error`
   
2. **rule_contract_id_format**
   - Fact: `contract_id`
   - Operator: `regex`
   - Expected: `^HL-\d{4}-\d{2}$` (e.g., HL-2026-07)
   - Severity: `error`

3. **rule_technician_exists**
   - Fact: `technician_name`
   - Operator: `exists`
   - Severity: `error`

4. **rule_service_date_valid**
   - Fact: `service_date`
   - Operator: `regex`
   - Expected: `^\d{4}-\d{2}-\d{2}$` (YYYY-MM-DD)
   - Severity: `error`

5. **rule_has_observations**
   - Fact: `observations`
   - Operator: `exists`
   - Severity: `error`

6. **rule_has_recommendations**
   - Fact: `recommendations`
   - Operator: `exists`
   - Severity: `warning` (Routine reports without faults may naturally lack recommendations)
