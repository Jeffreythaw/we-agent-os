# Test Plan

Any changes to this pack require executing the following test cases to ensure no regressions:

## 1. Success Case
- **Input:** `examples/service-report/harbourlink-routine-service.input.json`
- **Expected Outcome:** Passes all rules and checklists. Generates `harbourlink-routine-service.expected.md`.

## 2. Failure Cases (Must Halt)
- **Missing Photo Caption:** 
  - Input: `fail-missing-photo-caption.input.json` 
  - Expected Outcome: Must fail rule validation.
- **Missing Reference Number:** 
  - Input: `fail-missing-reference.input.json` 
  - Expected Outcome: Must fail rule validation.
- **Wrong Project Code:** 
  - Input: `fail-wrong-project.input.json` 
  - Expected Outcome: Must fail rule validation (`projectCode` != HBL).
