---
id: prompt_standard
type: standard
title: Prompt Standard
status: active
version: 1.0.0
last_updated: 2026-07-09
---

# Prompt Standard

## 1. Purpose
Govern how WE Agent OS communicates with LLMs.

## 2. Scope
Applies to all prompt templates, reasoning packs, and AI interactions.

## 3. Rules & Guidelines
- Treat the LLM as an untrusted, dangerous peripheral.
- Prompts must force strictly structured JSON outputs.
- Never use autonomous "Agent loops" that lack deterministic validation gates.
