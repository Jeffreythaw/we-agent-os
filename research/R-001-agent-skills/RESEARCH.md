# Research Package R-001

**Target Repository:** https://github.com/addyosmani/agent-skills
**Date:** 2026-07-08
**Researcher (Subagent):** Implementation Engineer

## 1. Overview
### Purpose
"Production-grade engineering skills for AI coding agents." The repository provides 24 structured workflows encoded as markdown files that guide an AI agent through software development lifecycle phases (Define, Plan, Build, Verify, Review, Ship).

### Repository Structure
- `skills/`: Contains the core markdown files representing the 24 skills.
- `agents/`: Contains 4 specialist personas (e.g., Code Reviewer, Security Auditor).
- `references/`: Supplementary checklists for performance, security, observability, etc.
- `commands/`, `hooks/`, `docs/`: Integrations for various IDEs and CLIs.

### Skill/Package Format
Each skill is contained in a `SKILL.md` file featuring:
- YAML Frontmatter (`name`, `description`).
- `Overview` and `When to Use`.
- `Process` (Step-by-step instructions).
- `Rationalizations` (Excuses an LLM might make + rebuttals).
- `Red Flags` (Signs the LLM is hallucinating or cutting corners).
- `Verification` (Strict evidence requirements).

### Documentation Style
Highly structured, explicit, and process-driven. It relies heavily on markdown tables and lists to combat LLM laziness, enforcing "Process, not prose."

### Examples/Tests Pattern
Verification is strictly evidence-based. The guidelines insist on running tests, inspecting build outputs, or using runtime data rather than relying on an LLM's intuition ("Seems right is never sufficient").

## 2. Evaluation Criteria Score
- **Modularity:** Pass (Skills are decoupled markdown files).
- **Dependency Bloat:** Pass (Zero dependencies, pure markdown).
- **LLM Decoupling:** Fail (These "skills" are purely text instructions designed for an LLM to read and execute autonomously. They are not deterministic TypeScript classes).
- **Reasoning Alignment:** Pass (Provides structured reasoning steps and distinct lifecycle boundaries).

## 3. License Clearance
- **License Type:** MIT License
- **Clearance Status:** APPROVED

## 4. Extracted Patterns
### Useful Patterns for WE Agent OS
- **Structured Markdown Prompts**: The anatomy of `SKILL.md` (frontmatter + rationalization tables + strict verification criteria) is an excellent pattern for constructing our future `ReasoningPacks` or the system prompts for our internal Subagents (e.g., the Implementation Engineer's instructions).
- **Anti-Rationalization Tables**: Explicitly telling an LLM what excuses it might make and how to overcome them prevents laziness and hallucination.

### Patterns NOT to Adopt
- **Markdown-as-Executable**: WE Agent OS enforces a deterministic `SkillEngine` where an `ISkill` is a TypeScript class. We must not adopt the pattern of handing a markdown file to an LLM and hoping it follows the steps. Orchestration belongs to the `WorkflowRunner`, not the LLM.

## 5. Business-Agent Impact Score
The *documentation styling* and *anti-rationalization* patterns benefit agents that will eventually require LLM reasoning or data extraction.
- **Service Report Agent:** High (v2 will use an LLM extraction skill that needs strict anti-hallucination prompting).
- **Email Agent:** High (Needs strict prompts to classify client intent without hallucinating).
- **Quotation Agent:** High (Needs strict prompts to map RFQs to JSON).
- **Inspection Agent:** Medium.
- **Bootstrap Agent:** High (Needs strict reasoning boundaries).
- **Budget Manager Agent:** Low (Purely deterministic).

## 6. Adoption Recommendation
**Recommendation: Reference Only / Adopt Documentation Style.**

- **Reject** the core mechanic of LLM-driven orchestration. 
- **Adopt** the `SKILL.md` anatomy (frontmatter + structured sections + anti-rationalizations) as the standard documentation style for defining WE Agent OS `KnowledgePacks`, `ReasoningProfiles`, and internal Subagent System Prompts in the future.

---
## Architect Approval Gate
- **Status:** PENDING
- **Reviewer:** Chief Architect
- **Notes:** (Awaiting Architect Review)
