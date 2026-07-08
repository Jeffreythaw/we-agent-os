# ADR 036: Reasoning Frameworks as Knowledge Packs

## Status
Accepted

## Context
Advanced problem-solving requires structured reasoning methodologies (e.g., Six Thinking Hats, SWOT, First Principles, OODA). Hardcoding these frameworks into the OS execution loop or creating separate dedicated subagents for each methodology leads to architectural bloat and rigid workflows.

## Decision
All Reasoning Frameworks will be implemented as modular **Knowledge Packs**. The OS Reasoning Engine will load the desired framework dynamically at runtime. A framework pack contains the definition of its distinct "Reasoning Profiles" (e.g., the 6 hats, the 4 components of SWOT), their deterministic rules, and their prompt-augmentation templates.

## Consequences
- **Pros**: The Reasoning Engine remains completely domain-agnostic. Adding support for TRIZ, PDCA, or 5 Whys simply requires dropping a new JSON/Markdown Knowledge Pack into the system without altering OS kernel code.
- **Cons**: Requires standardizing a universal JSON schema capable of describing diverse reasoning methodologies.
