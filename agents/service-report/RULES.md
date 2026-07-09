# Rules

These rules are enforced by the `RuleEngine` during `step-1-validate` of the workflow:

1. `projectCode` MUST exist.
2. `projectCode` MUST equal `HBL`.
3. `reportCategory` MUST equal `ROUTINE_CONTRACT_SERVICE`.
4. `equipmentType` MUST exist.
5. `serviceDate` MUST exist.
6. `referenceNumber` MUST match the regex pattern `^SVC/HBL/\d{6}/\d{3}$`.
7. `observations` MUST exist.
8. `photoCaptions` MUST exist.

Failure to meet any of these rules results in a hard stop.
