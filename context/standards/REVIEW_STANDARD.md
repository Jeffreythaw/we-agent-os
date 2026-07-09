---
id: review_standard
type: standard
title: Review Standard
status: active
version: 1.0.0
last_updated: 2026-07-09
---

# Review Standard

## 1. Purpose
Define the code review and approval gates.

## 2. Scope
Applies to all human and AI-proposed changes.

## 3. Rules & Guidelines
- The OS freeze is absolute. Any proposed change to `src/` requires a formal RFC.
- Reviewers must verify that Business Logic remains decoupled from the Core Engine.
- Context Manager injection features are currently locked and must be labeled **Concept Backlog / Evidence Required**.
