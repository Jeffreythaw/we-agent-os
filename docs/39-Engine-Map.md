# Engine Map

The WE Agent OS operates using modular, replaceable engines.

## Core Engines

1. **Kernel Engine**: Central orchestrator. Manages initialization and ties subsystems together. Status: Implemented (Phase 1).
8. **Workspace Engine**: Manages tenant boundaries and isolation. Status: Concept Backlog / Not Approved Runtime.
9. **Project Engine**: Manages site/client/job boundaries. Status: Concept Backlog / Not Approved Runtime.
10. **Persona Engine**: Loads and injects identity configs. Status: Concept Backlog / Not Approved Runtime.
11. **Planner Engine**: Decomposes user intent into DAGs. Status: Concept Backlog / Not Approved Runtime.
12. **Context Engine**: Manages the prompt window and sliding message windows. Status: Concept Backlog / Not Approved Runtime.
13. **Memory Engine**: Manages operational and experiential short/long-term RAM. Status: Concept Backlog / Not Approved Runtime.
14. **Knowledge Engine**: Handles RAG and reference material ingestion. Status: Concept Backlog / Not Approved Runtime.
15. **Artifact Engine**: Manages file production (PDF, Word, Markdown, Code). Status: Concept Backlog / Not Approved Runtime.
16. **Observability Engine**: Traces spans and generates metrics. Status: Concept Backlog / Not Approved Runtime.
17. **Learning Engine**: Suggests optimizations from execution traces. Status: Concept Backlog / Not Approved Runtime.
18. **Resource Engine**: Tracks budgets and token rate limits. Status: Concept Backlog / Not Approved Runtime.
19. **Scheduler Engine**: Schedules tasks and agent wake-ups based on dependencies. Status: Concept Backlog / Not Approved Runtime.

*(Detailed structures for each engine follow standard architectural templates: Purpose, Responsibilities, Inputs, Outputs, Connected entities, Connected events, Failure handling.)*
