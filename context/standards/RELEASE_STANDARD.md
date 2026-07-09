---
id: release_standard
type: standard
title: Release Standard
status: active
version: 1.0.0
last_updated: 2026-07-09
---

# Release Standard

## 1. Purpose
Govern the deployment of new versions of WE Agent OS.

## 2. Scope
Applies to release tagging and production builds.

## 3. Rules & Guidelines
- Working tree must be perfectly clean.
- All tests must pass unconditionally.
- `README.md` and `CHANGELOG.md` must be up to date.
- No ephemeral files (`node_modules`, `dist`, `output`) may be tracked.
