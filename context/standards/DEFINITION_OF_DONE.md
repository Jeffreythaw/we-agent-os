---
id: definition_of_done
type: standard
title: Definition Of Done
status: active
version: 1.0.0
last_updated: 2026-07-09
---

# Definition of Done

## 1. Purpose
Ensure all work meets the absolute minimum quality threshold of WE Agent OS.

## 2. Scope
Applies to all PRs, commits, and agent-generated artifacts.

## 3. Rules & Guidelines
- All unit and regression tests pass (`npm test`).
- No raw JSON, placeholder leakage, or unbound template variables exist in the output.
- No modifications were made to the `src/` framework unless via an approved RFC.
- Documentation and context files accurately reflect the changes.
