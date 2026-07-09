# Advanced Skills

## prompt refinement
- **When to use:** When an agent hallucinates
- **Required inputs:** Failing prompt + output
- **Output format:** Corrected prompt
- **Failure conditions:** If prompt exceeds token budget

## reasoning pack design
- **When to use:** When adding a new cognitive capability
- **Required inputs:** Cognitive goal
- **Output format:** Reasoning JSON pack
- **Failure conditions:** If logic loops infinitely
