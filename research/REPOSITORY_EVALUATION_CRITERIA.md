# Repository Evaluation Criteria

All external repositories must be evaluated against the following strict criteria before pattern extraction begins. If a repository fails on any of these core architectural boundaries, it cannot be integrated into WE Agent OS, though isolated conceptual patterns may still be observed.

## 1. Modularity (Pass/Fail)
- **Criteria**: Does the repository separate its core execution loop from its domain logic? 
- **Fail Condition**: Domain logic (e.g., prompts, specific API payloads, business rules) is hardcoded deeply into the core runtime engines.

## 2. Dependency Bloat (Pass/Fail)
- **Criteria**: Does the repository rely on heavy, opaque abstractions (e.g., LangChain) that hide execution paths?
- **Fail Condition**: The repository cannot function without importing massive, monolithic AI frameworks.

## 3. LLM Decoupling (AI-Optional) (Pass/Fail)
- **Criteria**: Can the core state machine or workflow runner execute basic deterministic tasks without calling an LLM?
- **Fail Condition**: The framework crashes or halts if an LLM is not provided to route the logic.

## 4. Reasoning Alignment (Pass/Fail)
- **Criteria**: Are the reasoning and planning phases distinct from the execution phases?
- **Fail Condition**: The repository allows the LLM to directly execute destructive terminal commands or API calls in the same step it uses to "think" about the problem.
