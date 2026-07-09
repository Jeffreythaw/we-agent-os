# Research Package R-004

**Target Source:** https://github.com/mohitagw15856/pm-claude-skills
**Date:** 2026-07-08
**Researcher (Subagent):** Implementation Engineer

## 1. Overview
### Purpose
`pm-claude-skills` is a massive open-source library of 466 professional agent skills aimed at product managers, engineers, and executives. It teaches AI the structure, rigour, and judgement that a senior professional uses to produce artifacts (e.g., PRDs, Executive Updates).

### Repository Structure
It is a large monorepo. The core is the `skills/` directory containing 466 folders, each holding a `SKILL.md` file. It also includes concepts like a local-first `brain/` mechanism, workflow recipes, and plugins for various AI IDEs.

### PM / Product Workflow Pattern
The library approaches product work with extreme structure. Artifacts are not freely generated; they adhere to strict templates that enforce business value. For instance, the `prd-template` skill enforces a specific structure (Problem Statement, Success Metrics, MVP Scope) and forbids writing implementation details or leaving success metrics un-baselined.

### Requirement Gathering Pattern
Skills include a strict "Required Inputs" block. The prompt instructs the agent: *Ask the user for these if not provided*. It prevents the LLM from hallucinating constraints and forces it to pause and gather requirements (e.g., Target User, Problem, Scope) before generating output. 

### Planning / Task Breakdown Pattern
The repository implements a "Workflow Recipe" pattern where skills are chained sequentially. The output of one skill explicitly feeds the context window of the next. For example, `ambiguity-resolver` → `prd-template` → `rice-prioritisation`. It also integrates deeply with a "Professional Brain"—explicitly reading from and writing to local markdown files (like `hypotheses/` or `decisions/`) to maintain state.

### Documentation Style
Highly prescriptive. Every `SKILL.md` contains frontmatter, required inputs, explicit reads/writes to memory, a template structure, quality checks, anti-patterns, and an example baseline.

## 2. Evaluation Criteria Score
- **Modularity:** Pass (Each skill is a standalone directory).
- **Dependency Bloat:** Pass (Skills are pure Markdown).
- **LLM Decoupling:** Fail (The architecture relies entirely on the LLM reading the `SKILL.md` file and self-orchestrating the steps, which violates WE Agent OS deterministic engine separation).
- **Reasoning Alignment:** Pass (Provides exceptionally strong reasoning rubrics, quality checks, and anti-patterns for professional business work).

## 3. License Clearance
- **License Type:** MIT License
- **Clearance Status:** APPROVED

## 4. Extracted Patterns
### Useful Patterns for WE Agent OS
- **Chained Workflow Recipes**: The concept of sequentially chaining skills where the output artifact of Step A becomes the required input of Step B is highly aligned with our `WorkflowRunner`.
- **Required Inputs Prompting**: Instructing the agent to halt execution and ask clarifying questions if key fields are missing.
- **Explicit Memory Reads/Writes (The Brain)**: Explicitly defining what facts a skill must query from the knowledge base before executing, and what decisions it must persist back to the ledger afterward.

### Useful Patterns for Bootstrap Agent
- **The Bootstrap Chain**: The Bootstrap Agent could utilize a chained workflow recipe: `idea-validation` → `prd-template` → `architecture-decision-record` → `repo-scaffold`.
- **Requirement Halts**: The Bootstrap Agent can use the "Required Inputs" pattern to refuse to scaffold a repository until the user defines the target audience, primary tech stack, and success metrics.

### Patterns NOT to Adopt
- **LLM Self-Orchestration**: Giving an LLM a markdown file with `[ ] Do this` and expecting it to manage its own state, memory reads/writes, and task ordering. WE Agent OS requires that memory I/O and task chaining be strictly handled by the deterministic `WorkflowRunner` and `SkillEngine`, not the LLM's context window.

## 5. Business-Agent Impact Score
The highly structured product management patterns benefit any agent generating business artifacts.
- **Service Report Agent:** Medium (Can utilize strict quality checks for report generation).
- **Email Agent:** Medium (Can utilize anti-patterns for professional tone).
- **Quotation Agent:** Medium.
- **Inspection Agent:** Low.
- **Bootstrap Agent:** High (Directly benefits from chained PRD/Architecture generation and explicit requirement halts).
- **Budget Manager Agent:** Low.
*Total Impact: Approved for Architect Review.*

## 6. Adoption Recommendation
**Recommendation: Reference Only / Adopt Pattern later with ADR.**

- **Reject** the execution paradigm (LLM self-orchestration).
- **Adopt later with ADR**: The "Chained Workflow Recipe" and "Required Inputs" patterns are highly valuable. When we build the `ExtractionSkill` and `WorkflowRunner` v2, we should draft an ADR to implement strict state-passing between skills and required-input halts.

---
## Architect Approval Gate
- **Status:** PENDING
- **Reviewer:** Chief Architect
- **Notes:** (Awaiting Architect Review)
