# Research Package R-003

**Target Source:** https://pi.dev/
**Date:** 2026-07-08
**Researcher (Subagent):** Implementation Engineer

## 1. Overview
### Purpose
Pi is a terminal-based coding agent and minimal agent harness. Its core philosophy is to provide an aggressively minimal core environment and force users to adapt the tool to their workflow via dynamic TypeScript extensions and packages.

### Agent Harness Concept
Unlike monolithic agents that bake in sub-agents, planning modes, and Model Context Protocol (MCP) integrations, Pi strips these out entirely. The harness only provides the TUI, context window, and API connections, leaving orchestration up to the user's custom scripts.

### Extension Model
Extensions are TypeScript modules that possess deep, unrestricted access to the core runtime—including tools, commands, keyboard shortcuts, events, and the full TUI. Users write extensions to implement features like permission gates, sandboxing, or sub-agents.

### Skill/Package Model
Pi relies on dynamic context engineering. It loads `AGENTS.md` and `SYSTEM.md` files from the working directory upwards to configure the project environment, and allows CLI tools with READMEs to act as "Skills."

### Prompt Template Model
Prompt templates are reusable Markdown files that can be expanded dynamically via chat commands (e.g., `/name`).

## 2. Evaluation Criteria Score
- **Modularity:** Fail (Extensions inject directly into the core runtime, breaking strict isolation boundaries between the execution loop and the domain logic).
- **Dependency Bloat:** Pass (The core remains minimal).
- **LLM Decoupling:** Fail (Pi is fundamentally an LLM chat/RPC wrapper, not a deterministic workflow engine).
- **Reasoning Alignment:** Fail (By stripping out built-in planning/sub-agent modes and handing orchestration to raw user scripts or the LLM directly, it lacks a formal reasoning gate like our `ConsensusService`).

## 3. License Clearance
- **License Type:** Unverified via website (NPM package `@earendil-works/pi-coding-agent`).
- **Clearance Status:** Not applicable (We are evaluating public concepts, not copying source code).

## 4. Extracted Patterns
### Useful Patterns for WE Agent OS
- **Directory-Crawling Context Loading (`AGENTS.md`)**: The pattern of loading configuration files from the current directory and bubbling up to the user's home directory. (Note: We already implement a variation of this via our Customization Roots).
- **Markdown Prompt Templates**: Storing reusable prompts as simple markdown files maps cleanly to our `TemplateEngine`.

### Patterns NOT to Adopt
- **Unrestricted Code Extensions**: Allowing arbitrary user TypeScript to mutate the core runtime (TUI, events, routing) violates our security boundary. In WE Agent OS, business capabilities must be isolated inside an `ISkill` evaluated by the deterministic `WorkflowRunner`.
- **Offloading Safety**: Pi intentionally omits permission popups and instructs users to "run in a container" or build their own permission gates. WE Agent OS strictly enforces the `ApprovalGate` and `PolicyEngine` synchronously to prevent catastrophic actions. We must never offload safety to the user.

## 5. Business-Agent Impact Score
- **Service Report Agent:** Low
- **Email Agent:** Low
- **Quotation Agent:** Low
- **Inspection Agent:** Low
- **Bootstrap Agent:** Medium (Could utilize markdown prompt templates).
- **Budget Manager Agent:** Low
*Total Impact: Fails the Rule of Three. Rejected.*

## 6. Adoption Recommendation
**Recommendation: Reject.**

The core philosophy of Pi (an aggressively extensible, minimal developer chat harness where security, routing, and planning are explicitly offloaded to arbitrary user scripts) is fundamentally incompatible with the WE Agent OS philosophy (a heavily governed, deterministic workflow engine designed to safely execute offline business processes).

We will not adopt its extension model, its orchestration approach, or its safety architecture.

---
## Architect Approval Gate
- **Status:** REJECTED
- **Reviewer:** Chief Architect
- **Notes:** Automatically rejected due to failing the Business-Agent Impact score matrix. Archived for historical context only.
