# Test Plan

Any changes to this pack require executing the following test cases to ensure no regressions:

## Automated Testing

An explicit shell script has been created to run all regression tests automatically.

Run the following command from the repository root:
```bash
./tests/run_service_report_tests.sh
```

### Test Cases Covered:

#### 1. Success Case
- **Input:** `examples/service-report/harbourlink-routine-service.input.json`
- **Expected Outcome:** Passes all rules and checklists. Generates `harbourlink-routine-service.expected.md`. The script verifies exit code 0.

#### 2. Failure Cases (Must Halt)
- **Missing Photo Caption:** 
  - Input: `fail-missing-photo-caption.input.json` 
  - Expected Outcome: Must fail rule validation. The script verifies non-zero exit code.
- **Missing Reference Number:** 
  - Input: `fail-missing-reference.input.json` 
  - Expected Outcome: Must fail rule validation. The script verifies non-zero exit code.
- **Wrong Project Code:** 
  - Input: `fail-wrong-project.input.json` 
  - Expected Outcome: Must fail rule validation (`projectCode` != HBL). The script verifies non-zero exit code.

### Pending Requirements (Do Not Implement Yet)
- **Signature/Acknowledgement Area:** The `html-template` and `signature-acknowledgement` section skills specify a requirement for customer signoff. This is not yet tested as it awaits explicit approval to modify the HTML output.
