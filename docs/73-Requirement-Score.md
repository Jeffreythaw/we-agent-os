# Requirement Score & Definition of Ready (DoR)

## The Requirement Score
The Requirement Score is a mathematically calculated integer (0-100) representing project definition maturity. It evaluates the boolean output of the OS RuleEngine against the accumulated project facts.

## Definition of Ready (DoR)
A project meets the Definition of Ready **only when**:
1. All core completion rules return `passed: true`.
2. The aggregate Requirement Score is >= 80.
3. No contradictions exist in the technical stack facts.

## Behavior
If the DoR is not met, the system transitions to the Question Engine. If the DoR is met, the system permits execution of the Project Bootstrap Workflow to generate the `PROJECT_SPEC.md`.
