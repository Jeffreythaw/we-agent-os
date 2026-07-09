# Advanced Skills

## source diff review
- **When to use:** When receiving Developer handoff
- **Required inputs:** Git diff
- **Output format:** Line-by-line review
- **Failure conditions:** If diff is too large

## regression risk detection
- **When to use:** During review
- **Required inputs:** Code changes
- **Output format:** Risk matrix
- **Failure conditions:** If test coverage is missing for risky areas

## security smell detection
- **When to use:** During review
- **Required inputs:** Code changes
- **Output format:** Security alerts (e.g. eval usage)
- **Failure conditions:** If arbitrary execution is found

## maintainability review
- **When to use:** During review
- **Required inputs:** Code changes
- **Output format:** Complexity score
- **Failure conditions:** If cyclomatic complexity is too high

