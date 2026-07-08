# Workflow-First Architecture

## 1. Paradigm Shift
In the original conception of WE Agent OS, the LLM Provider was treated as the "brain" of the operation, guiding every step of the execution loop. In Phase 0.9, we shift to a **Workflow-First, AI-Optional** architecture. The true intelligence layer of the OS resides in the **Workflow Engine** and **Skill Engine**.

## 2. Core Philosophy
- **Deterministic by Default**: The OS relies on deterministic domain workflows, rules, checklists, templates, and standard tools as its primary execution model.
- **AI as a Helper**: External AI providers are downgraded from the "primary brain" to "optional helpers" invoked only when strict conditions are met.
- **Offline Capable**: The system must support fully offline, local, deterministic workflows without requiring an internet connection or an active LLM provider.

## 3. Impact on Architecture v2
The Workflow Composer now routes execution through deterministic paths. If a step can be solved with a simple regex, a script, or a template, the OS will not invoke an LLM. The Execution Pipeline only engages the Reasoner/Provider if a step explicitly requires cognitive abstraction.
