---
id: 0003-web-first-mvp
type: architecture_decision_record
title: Web First MVP
status: active
version: 1.0.0
last_updated: 2026-07-09
---

# ADR 0003: Web-first MVP

## Context
Electron and Desktop packaging introduce massive overhead, complex build pipelines, and delayed shipping times.

## Decision
The v0.2 UI target is exclusively Web-only (React + Vite). Desktop/Electron builds are deferred to the Concept Backlog.

## Consequences
Faster iteration loops. We rely on a local Vite bridge to execute the CLI backend.

## Enforcement
No Electron dependencies (`electron`, `wait-on`, etc.) are permitted in `web-app/package.json`.
