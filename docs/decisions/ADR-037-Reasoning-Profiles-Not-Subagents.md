# ADR 037: Reasoning Profiles, Not Subagents

## Status
Accepted

## Context
When implementing multi-perspective reasoning like De Bono's Six Thinking Hats, the naive approach is to spawn six distinct, autonomous LLM Subagents and have them "debate". This consumes massive compute, suffers from unpredictable orchestration, and violates our AI-optional, deterministic-first principles.

## Decision
We model diverse perspectives as **Reasoning Profiles**, not Subagents. A Reasoning Profile is a stateless configuration object (rules, constraints, focus areas) loaded from a Knowledge Pack. The single Reasoning Engine sequentially or deterministically executes these profiles against the context, generating structured outputs.

## Consequences
- **Pros**: Drastically reduces LLM token overhead and latency. Allows for purely deterministic profiles (e.g., a "Black Hat" profile might just be a strict `RuleEngine` checklist of security constraints that runs without any LLM invocation). 
- **Cons**: Profiles do not "chat" with each other dynamically; their outputs must be merged and reconciled by a centralized Consensus Service.
