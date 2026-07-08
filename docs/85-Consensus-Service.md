# Consensus Service

## Purpose
The Consensus Service is the ultimate gatekeeper between Planning and Execution. It consumes the disparate outputs of the active Reasoning Profiles and mathematically guarantees safety.

## Responsibilities
The service analyzes the aggregated `ReasoningOutputSchema` array and computes:
1. **Agreements**: Points where multiple profiles aligned (e.g., both Yellow and Green suggest caching).
2. **Conflicts**: Contradictions requiring resolution (e.g., Black Hat flags caching as a security risk for PII data).
3. **Missing Information**: Variables flagged by the White Hat or Discovery profiles.
4. **Risks**: All unmitigated failure modes.
5. **Clarification Questions**: Prompts generated for the human operator to resolve conflicts.
6. **Confidence Score**: A 0-100 metric of how unified the reasoning was.
7. **Readiness Score**: A boolean or integer gating progression.

## Execution Gating
Final execution workflows cannot proceed unless the Consensus Service declares `ready: true`. If conflicts exist, the OS pauses and utilizes the Question Engine to ask the user how to mitigate the Black Hat's concerns.
