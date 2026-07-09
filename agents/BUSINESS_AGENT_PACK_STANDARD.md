# Business Agent Pack Standard

This document defines the strict standard for creating, managing, and executing Business Agent Packs within WE Agent OS. This standard enforces the "Business Agents are the product" and "Workflow-First, AI-Optional" governance rules.

## 1. Purpose of Business Agent Packs

A Business Agent Pack is the encapsulated, domain-specific configuration that teaches the deterministic core OS engines (WorkflowRunner, RuleEngine, ChecklistEngine, TemplateEngine) how to execute a specific business process. 
Business Agent Packs isolate domain knowledge from framework architecture, ensuring that executing a workflow requires zero changes to the underlying OS. They ensure repeatable, offline-capable, and strictly governed execution.

## 2. Required Folder Structure

Each Business Agent Pack must reside in its own isolated directory under `agents/<agent-name>/`.

```
agents/<agent-name>/
├── AGENT.md
├── WORKFLOW.json
├── KNOWLEDGE_PACK.md (or knowledge/)
├── RULES.md (or rules/)
├── CHECKLISTS.md (or checklists/)
├── TEMPLATES.md (or templates/)
├── EXAMPLES.md (or examples/)
├── EXPECTED_OUTPUT.md (or expected-output/)
├── TEST_PLAN.md
└── LIMITATIONS.md
```

## 3. Required Files

Every Business Agent Pack MUST include the following files:

- **`AGENT.md`**: The primary specification detailing the agent's purpose, scope, and orchestrating roles.
- **`WORKFLOW.json`**: The deterministic JSON definition of the execution steps, consumed by the `WorkflowRunner`.
- **`KNOWLEDGE_PACK.md` or `knowledge/`**: Domain-specific facts, definitions, and context required for the agent to reason about the business process.
- **`RULES.md` or `rules/`**: Strict business constraints consumed by the `RuleEngine`.
- **`CHECKLISTS.md` or `checklists/`**: Step-by-step verification gates consumed by the `ChecklistEngine`.
- **`TEMPLATES.md` or `templates/`**: The strict structural layouts for input parsing and output artifact generation consumed by the `TemplateEngine`.
- **`EXAMPLES.md` or `examples/`**: Gold-standard input/output examples to ground execution.
- **`EXPECTED_OUTPUT.md` or `expected-output/`**: The strict schema or definition of the final deliverable.
- **`TEST_PLAN.md`**: How this specific pack will be verified for correctness and regressions.
- **`LIMITATIONS.md`**: Explicit documentation of what the agent cannot do and scenarios where it fails.

## 4. Business Agent Pack Lifecycle

1. **Discovery & Specification**: Define the business problem and scope. Create the initial `AGENT.md` and `LIMITATIONS.md`.
2. **Knowledge Extraction**: Capture domain knowledge, rules, and templates into the Pack.
3. **Workflow Assembly**: Map the business process into the deterministic `WORKFLOW.json`.
4. **Loop Engineering (Execution & Refinement)**: Iterative refinement of the Pack's outputs against business expectations (see Section 5).
5. **Approval & Freeze**: The Pack passes all checklists and is marked production-ready.
6. **Maintenance**: Any changes to the Pack must be regression-tested.

## 5. Loop Engineering Method

WE Agent OS enforces the "Loop Engineering Method" for ensuring output quality during execution and refinement:

1. **User Feedback**: The user provides feedback on a generated artifact or intermediate step.
2. **Verifier Checks**: The Verifier Agent cross-references the feedback against `RULES.md` and `CHECKLISTS.md`.
3. **Planner Creates Correction Plan**: The Planner Agent drafts a specific plan to address the failure without violating existing constraints.
4. **Developer Applies Fix**: The Developer Agent executes the correction plan to update the artifact.
5. **Verifier Re-checks**: The Verifier Agent strictly re-evaluates the updated artifact against the checklist.
6. **Approval Gate**: The Approval Owner gives explicit consent.
7. **Final Output**: The corrected artifact is finalized.

## 6. Required Agent Roles

During the Loop Engineering process, the following internal roles are utilized:

- **Planner Agent**: Analyzes constraints and drafts the correction/execution plan.
- **Developer Agent**: Executes the plan and performs the artifact generation or modification.
- **Verifier Agent**: Acts as the strict QA gate, enforcing `CHECKLISTS.md` and `RULES.md`.
- **Approval Owner**: The human (or designated framework proxy) that provides explicit sign-off at the Approval Gate.

## 7. Feedback Handling Workflow

Feedback is never blindly applied. When feedback is received:
1. It is intercepted by the Verifier Agent.
2. It is evaluated against the `LIMITATIONS.md` and `RULES.md` to ensure it is not out-of-scope or violating policy.
3. If valid, it triggers a new Loop Engineering cycle.
4. If invalid, the Verifier Agent rejects the feedback with explicit citations from the Pack's constraints.

## 8. Regression Test Rule

**Rule:** Modifying any file within a Business Agent Pack (especially `WORKFLOW.json`, `RULES.md`, or `TEMPLATES.md`) requires a full run of the `TEST_PLAN.md` against the gold-standard examples in `EXAMPLES.md`. The output must match the `EXPECTED_OUTPUT.md` without introducing regressions to previously solved edge cases.

## 9. Evidence Requirements

"Seems right" is never sufficient. Verification requires physical evidence:
- **Rule Verification**: Explicit citations of which rules were applied.
- **Checklist Verification**: A completed checklist artifact (`[x]`) for the specific run.
- **Testing**: Test suite pass logs or explicit manual verification sign-offs from the Approval Owner.

## 10. What Business Agent Packs MUST NOT Do

To maintain the integrity of WE Agent OS, Business Agent Packs:
- **Must NOT change the framework**: Packs are configuration data. They cannot alter OS core files (e.g., engines, CLI).
- **Must NOT bypass rules/checklists**: The `RuleEngine` and `ChecklistEngine` steps in the `WORKFLOW.json` are mandatory.
- **Must NOT call an LLM by default**: Unless specifically defined via an `ExtractionSkill` or `ReasoningProfile`, workflows default to deterministic, offline execution.
- **Must NOT skip approval**: The final output or critical destructive actions must pass through an `ApprovalGate`.

## 11. Application to Initial Agents

This standard will be applied immediately to the initial Agent-first roadmap:

1. **Service Report Agent**: Will be migrated into this structure first to prove the offline, deterministic extraction capabilities against the HarbourLink Routine Contract Service Report.
2. **Email Agent**: Will utilize this structure, relying heavily on `RULES.md` for brand voice and `TEMPLATES.md` for structure.
3. **Quotation Agent**: Will utilize this structure to strictly govern pricing calculations via `RULES.md` and `EXPECTED_OUTPUT.md`.
