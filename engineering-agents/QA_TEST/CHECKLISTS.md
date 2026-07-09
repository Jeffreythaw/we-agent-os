# Concrete Checklists

## Pre-Execution
- [ ] Verify upstream handoff artifact is present.
- [ ] Validate required inputs exist and are well-formed.
- [ ] Confirm no forbidden constraints are currently active.

## Post-Execution
- [ ] Verify output artifact strictly matches the required format.
- [ ] Ensure the approval gate (Do all concrete pre-commit checks pass successfully?) is met.

## Mandatory Pre-Commit Checks
- [ ] `npm test`
- [ ] `./tests/run_service_report_tests.sh`
- [ ] `cd web-app && npm run build`
- [ ] `git status`
- [ ] `git diff --stat`
