---
id: spec_maintenance_standard
type: standard
title: SPEC Maintenance Standard
status: active
version: 1.0.0
last_updated: 2026-07-09
---

# SPEC Maintenance Standard

## 1. Purpose
Govern how Specifications (SPECs) are maintained, updated, and logged over the lifetime of the WE Agent OS and its Business Agents, ensuring zero silent architecture drift.

## 2. Scope
Applies to all changes targeting any document within `context/specs/`, including `PRODUCT_SPEC.md`, `PROJECT_SPEC.md`, `FUNCTIONAL_SPEC.md`, `TECHNICAL_SPEC.md`, `MODULE_SPEC.md`, and `FEATURE_SPEC.md`.

## 3. Rules & Guidelines
1. **No Silent Drift**: Specifications must reflect the literal state of the implementation. No undocumented changes are permitted.
2. **RFC Requirement**: Any SPEC change that requires modifying the core `src/` framework requires a formal RFC (`context/rfc/RFC_TEMPLATE.md`).
3. **ADR Consistency**: Any proposed SPEC change must be validated against existing ADRs. Contradictions must block the change until explicitly resolved by a human.
4. **Approval Gate**: The SPEC Maintainer Subagent (or human) proposing the change cannot approve its own change. A distinct human reviewer must approve the final update.
5. **Change Logging**: Every approved modification must be appended to `context/specs/SPEC_CHANGE_LOG.md`.
