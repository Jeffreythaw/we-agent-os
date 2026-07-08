# Reasoning Framework Architecture

## Overview
The Reasoning Framework Architecture provides a structured, methodology-agnostic layer for deeply analyzing tasks before execution. It sits between the Business Analysis (Discovery) layer and the final Execution Loop.

## Core Components
1. **Knowledge Packs**: The static JSON/Markdown schemas defining the reasoning methodology (Six Hats, SWOT, First Principles, OODA, PDCA, TRIZ).
2. **Reasoning Profiles**: The individual perspectives or lenses defined within the pack (e.g., "Black Hat", "Threats", "Whys").
3. **Reasoning Engine**: The orchestrator that loads the profiles, applies them to the current task context, and generates structured output. AI is optional; deterministic checklists can fulfill a profile's requirements.
4. **Consensus Service**: The synthesizer that mathematically merges the disparate profile outputs into a unified go/no-go readiness score.

## Principles
- **Agnosticism**: The OS never hardcodes "Six Hats". It merely executes the active `ReasoningPack`.
- **Statelessness**: Profiles do not retain state or chat dynamically. They are pure functions: `f(context, profile) -> ReasoningOutput`.
- **Determinism First**: A profile like "Security Review" can be fulfilled purely by the deterministic RuleEngine without LLM tokens.
