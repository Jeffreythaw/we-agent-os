# Research Package R-002

**Target Repository:** https://github.com/google-labs-code/design.md
**Date:** 2026-07-08
**Researcher (Subagent):** Implementation Engineer

## 1. Overview
### Purpose
`DESIGN.md` is a format specification for describing visual identities and design systems to coding agents. It merges machine-readable design tokens with human-readable rationale into a single file to provide persistent context.

### Repository Structure
The repository appears to be a monorepo structure (with `packages/`, `docs/`, `examples/`) using Turbo and Bun. It includes a CLI parser/linter for validating the `.md` format.

### Design/Document Standard Format
The format relies on a "hybrid layer" approach:
1. **YAML Front Matter**: Strict, machine-readable design tokens (e.g., colors, typography, components, spacing).
2. **Markdown Body**: Prose separated by strict `##` headings that dictate the exact order of context sections (e.g., Overview, Colors, Typography, Layout).

### Documentation Style
The specification itself is highly structured and provides exact schema mappings, allowed CLI arguments, and linting rules. It is designed to be easily read by an LLM so the agent knows precisely how to interact with the file.

## 2. Evaluation Criteria Score
- **Modularity:** Pass (The standard format is cleanly decoupled from any specific generation engine).
- **Dependency Bloat:** Pass (The format itself is just YAML/Markdown. The CLI requires Node but is standalone).
- **LLM Decoupling:** Pass (The file can be parsed programmatically by standard YAML and Markdown parsers without an LLM).
- **Reasoning Alignment:** Pass (Provides the necessary context for the agent to reason about design choices without executing logic).

## 3. License Clearance
- **License Type:** Apache License 2.0
- **Clearance Status:** APPROVED

## 4. Extracted Patterns
### Useful Patterns for WE Agent OS
- **Hybrid Data Structures (YAML + Markdown)**: Combining strict machine-readable variables in frontmatter with human-readable markdown is highly aligned with our Knowledge Pack and Template architectures. We can use this pattern to define the *schema* of a template at the top of a file, and the *content* at the bottom.
- **Strict Section Ordering**: Enforcing a strict order of Markdown `##` headings makes parsing the prose programmatically much more robust.

### Useful Patterns for Service Report Agent
- In the future (v3 Artifact Engine), the Service Report Agent could utilize a template format inspired by `DESIGN.md`:
  - **YAML**: Defining the required variables (e.g., `referenceNumber`, `projectCode`).
  - **Markdown**: The physical report layout.

### Patterns NOT to Adopt
- **Custom Parsers/Linters**: We do not need to import or adopt the `@google/design.md` CLI. Our core `TemplateEngine` and standard JSON/YAML parsing are sufficient. We only care about the file format paradigm, not the parser toolchain.

## 5. Business-Agent Impact Score
The *hybrid YAML+Markdown template pattern* benefits multiple agents that generate or consume artifacts.
- **Service Report Agent:** Medium (Could use this for defining v3 report templates).
- **Email Agent:** Medium (Could use this for configuring brand voice vs. actual email content).
- **Quotation Agent:** High (Could use this for pricing table tokens in frontmatter + boilerplate text in markdown).
- **Inspection Agent:** Low.
- **Bootstrap Agent:** High (Could literally generate a `DESIGN.md` file for scaffolded projects).
- **Budget Manager Agent:** Low.
*Total Impact: Approved for Architect Review.*

## 6. Adoption Recommendation
**Recommendation: Reference Only / Adopt Document Standard.**

- **Reject** importing the custom linter CLI as it creates unnecessary framework dependencies.
- **Adopt** the concept of hybrid "YAML Frontmatter + Markdown Body" for our future WE Agent OS template definitions, as it seamlessly bridges the gap between deterministic parsing and human readability.

---
## Architect Approval Gate
- **Status:** PENDING
- **Reviewer:** Chief Architect
- **Notes:** (Awaiting Architect Review)
