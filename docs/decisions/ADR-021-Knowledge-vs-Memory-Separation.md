# ADR 021: Knowledge vs Memory Separation

## Status
Accepted

## Context
Combining static reference material and dynamic agent thoughts into a single "Memory" concept leads to confusion and poor RAG performance.

## Decision
Separate "Knowledge" (static reference material) from "Memory" (dynamic operational context).

## Consequences
- **Pros**: Allows different storage backends (e.g., Vector DB for Knowledge, Redis/JSON for Memory).
- **Cons**: Two distinct APIs to manage.
