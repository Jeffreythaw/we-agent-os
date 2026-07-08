# Reasoning Engine

## Purpose
The Reasoning Engine is the runtime orchestrator for evaluating a task against a loaded Reasoning Framework Knowledge Pack.

## Responsibilities
1. **Pack Loading**: Mounts the configured framework (e.g., SWOT) for the given workflow.
2. **Profile Execution**: Iterates through the framework's defined Reasoning Profiles.
3. **Routing**: For each profile, determines the execution path:
   - *Deterministic Path*: If the profile defines strict rules/checklists, it routes to the `system.checklist_check` skill.
   - *AI Path*: If the profile requires abstract reasoning (and the Escalation Policy allows), it routes to an LLM Provider using the profile's augmentation template.
4. **Output Standardization**: Coerces all profile evaluations into the standard `ReasoningOutputSchema`.

## Example Flow
Given the "5 Whys" framework:
- The Engine reads the 5 iterative profiles.
- It executes Profile 1 ("Why did X happen?").
- Passes the output as context to Profile 2.
- Aggregates the 5 structured answers for the Consensus Service.
