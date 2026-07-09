# Rules

These rules are enforced by the `RuleEngine` during `step-1-validate` of the workflow:

1. `projectCode` MUST exist.
2. `projectCode` MUST equal `HBL`.
3. `reportCategory` MUST equal `ROUTINE_CONTRACT_SERVICE`.
4. `client` MUST exist.
5. `equipment` MUST exist.
6. `serviceDate` MUST exist.
7. `referenceNo` MUST match the regex pattern `^SVC/HBL/\d{6}/\d{3}$`.
8. `workDescription` MUST exist.
9. `findings` MUST exist.
10. `photoCaptions` MUST exist.
11. `finalOperatingCondition` MUST exist.

Failure to meet any of these rules results in a hard stop.
