# ADR 038: Consensus Before Final Execution

## Status
Accepted

## Context
Once multiple Reasoning Profiles (e.g., White Hat facts, Black Hat risks, Yellow Hat benefits) generate their individual outputs, the OS requires a mechanism to synthesize these fragmented views into an actionable go/no-go decision.

## Decision
We introduce the **Consensus Service**. For workflows that load and execute a Reasoning Framework (e.g., Six Hats), final execution steps (e.g., writing code, deploying infrastructure) are strictly halted until the Consensus Service processes all profile outputs. It identifies conflicts, calculates a Readiness Score, and formally declares the task "Consensus Ready". This is *not* a universal gate for all executions; simple deterministic workflows without reasoning packs bypass this block.

## Consequences
- **Pros**: Prevents catastrophic execution by ensuring that identified risks (Black Hat) are explicitly mitigated or accepted before execution begins. Mathematically gates execution via a readiness score.
- **Cons**: Adds a strict blocking step between planning and execution, potentially slowing down trivial tasks (unless the workflow opts for a minimal reasoning pack).
