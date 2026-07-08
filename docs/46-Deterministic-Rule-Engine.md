# Deterministic Rule Engine

## 1. Concept
The Deterministic Rule Engine is a new subsystem within the Workflow Engine that evaluates logic without using LLMs.

## 2. Responsibilities
- Evaluate boolean logic, regex matching, and state comparisons.
- Route workflow DAGs based on hardcoded business logic rather than prompt-based reasoning.
- Validate inputs and outputs using strict schemas (e.g., Zod) before deciding if an LLM fallback is necessary.

## 3. Execution
When a Skill is executed, the Rule Engine attempts to satisfy the requirement using local scripts, tools, and strict validation. It is the first line of defense against hallucinations and high token costs.
