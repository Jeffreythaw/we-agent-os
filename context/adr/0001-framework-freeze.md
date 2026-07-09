---
id: 0001-framework-freeze
type: architecture_decision_record
title: Framework Freeze
status: active
version: 1.0.0
last_updated: 2026-07-09
---

# ADR 0001: Framework Freeze

## Context
The v0.1.0-alpha OS kernel has achieved deterministic stability. Constant refactoring of the kernel introduces severe regression risk.

## Decision
The core framework (`src/`) is frozen.

## Consequences
New capabilities must be built as decoupled Business Agents or Knowledge Packs rather than modifying the core engine.

## Enforcement
Code reviews and automated tests will reject any modifications to `src/` without an approved RFC.
