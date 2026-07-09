---
id: 0004-manual-loop-engineering
type: architecture_decision_record
title: Manual Loop Engineering
status: active
version: 1.0.0
last_updated: 2026-07-09
---

# ADR 0004: Manual Loop Engineering

## Context
Autonomous LLM loops are highly prone to hallucination, infinite loops, and non-determinism.

## Decision
We mandate a "Human-in-the-Loop" or "Deterministic-Gate-in-the-Loop" architecture.

## Consequences
The OS orchestrates execution. The LLM is only called for discrete, bounded tasks.

## Enforcement
The `WorkflowRunner` dictates flow. Unbounded agent loops are strictly prohibited.
