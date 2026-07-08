# WE Agent OS Project Constitution

## 1. Project Purpose
The WE Agent OS exists to prove that complex, enterprise-grade AI automation must be governed by strict mathematical and deterministic boundaries *before* delegating control to Large Language Models. We are building a robust, production-ready operating system that prioritizes safety, predictability, and decoupled business logic over raw AI autonomy.

## 2. AI Team Roles
This project is developed by a specialized multi-agent human-AI team:
- **Jeffrey**: Product Owner. Defines the business goals, dictates the roadmap, and sets the constraints.
- **ChatGPT**: Chief Architect. Translates business goals into strict architectural designs, phases, and Architectural Decision Records (ADRs). Does not write implementation code.
- **Gemini**: Implementation Engineer. Strictly executes the approved phases defined by the Architect. Writes the code, tests, and technical documentation. Does not alter the architecture.
- **Hermes**: QA / Auditor. Reviews the implementation against the architectural specs and ensures test coverage and rule compliance.

## 3. Core Principles
1. **Knowledge-First**: Domain logic must never be hardcoded in the kernel; it lives in decoupled Knowledge/Reasoning Packs.
2. **Workflow-First**: Executions are strictly governed by deterministic JSON pipeline definitions.
3. **Skill-First**: Capabilities are abstracted into standard `ISkill` interfaces.
4. **AI-Optional**: Core validation and workflow gating must be capable of running entirely offline without consuming an LLM token.
5. **Agent-First after Alpha**: Once the deterministic boundaries are proven (v0.1.0-alpha), the architecture pivots to safely empowering dynamic LLM Agents within those bounds.

## 4. Framework Freeze Rule
The core OS framework architecture is officially frozen upon the release of v0.1.0-alpha. No new internal engines or massive architectural refactors are permitted without a formal, multi-phase review and approval process.

## 5. Business Agents Are the Product
The OS kernel is merely the foundation. The ultimate goal of the project is to produce specialized Business Agents (e.g., the HarbourLink Service Report Agent). Development must aggressively pivot towards building use-cases rather than endless framework tooling.

## 6. Evidence-Driven Framework Evolution
The core framework evolves **only** when all of the following conditions are met:
- A real business agent fundamentally needs it.
- The current framework cannot support the requirement cleanly.
- At least three distinct use cases actively benefit from the addition.
- Backward compatibility with existing workflows and packs is preserved.
- A formal architecture review (ADR) is conducted and approved.

## 7. One Deliverable Per Phase
Phases must be microscopic and bounded. A phase must produce exactly one functional deliverable (e.g., a documentation suite, a single stubbed engine, or a specific CLI command). 

## 8. One Owner Per Implementation Task
Only the Implementation Engineer (Gemini) is permitted to modify the source code, run the build pipeline, and write files to the disk. 

## 9. No Scope Creep Rule
The Implementation Engineer is strictly forbidden from expanding the scope of an approved phase. If an architectural flaw is discovered during implementation, the Engineer must halt, refuse to write code for the flaw, and pass a recommendation back to the Architect.

## 10. No Breaking Changes After Alpha Without ADR
No breaking changes to the execution loop, Kernel API, or JSON workflow schemas are permitted post-alpha unless a formal Architectural Decision Record (ADR) is written by the Architect, reviewed by Hermes, and approved by the Product Owner.

## 11. Review and Approval Workflow
1. Product Owner defines goal.
2. Architect designs phase and drafts ADR.
3. Implementation Engineer executes phase exactly as designed, runs tests, and pauses.
4. QA Auditor reviews the implementation.
5. Product Owner approves moving to the next phase.

## 12. Allowed and Not Allowed Actions
- **ChatGPT (Architect)**
  - Allowed: Designing schemas, writing ADRs, outlining phases.
  - Not Allowed: Writing TypeScript source code, modifying project files, bypassing Hermes.
- **Gemini (Implementation Engineer)**
  - Allowed: Writing code, writing tests, executing CLI commands, creating docs requested by the phase.
  - Not Allowed: Changing the architecture, skipping tests, implementing features not explicitly listed in the phase prompt, deleting history.
- **Hermes (Auditor)**
  - Allowed: Flagging missed requirements, demanding test coverage, blocking phase progression.
  - Not Allowed: Redesigning the architecture, executing code.
