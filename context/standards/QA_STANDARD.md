---
id: qa_standard
type: standard
title: QA Standard
status: active
version: 1.0.0
last_updated: 2026-07-09
---

# QA Standard

## 1. Purpose
Enforce deterministic quality assurance across the OS.

## 2. Scope
Applies to execution pipelines and Web UI logic.

## 3. Rules & Guidelines
- **Deterministic Bounds**: Workflows must fail safely and explicitly. Silent failures are forbidden.
- **Regression**: All scripts (e.g. `./tests/run_service_report_tests.sh`) must pass before a commit.
- **Accessibility**: UI deletions must be safe (e.g., two-step confirmation), stop propagation, and use proper aria-labels.
