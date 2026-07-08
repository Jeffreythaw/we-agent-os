# WE Agent OS

## 1. Project Overview
WE Agent OS is a deterministic, workflow-driven operating system designed to execute complex business tasks with mathematical precision. Rather than relying on unbounded LLM loops (which are prone to hallucination and non-determinism), WE Agent OS forces all execution through strict, JSON-defined workflows and rule engines. 

## 2. Vision
To create a strictly "Workflow-First, Skill-First, AI-Optional" architecture where AI is treated as a dangerous, untrusted peripheral rather than the core brain. We believe that business logic should be statically analyzable and that the OS must guarantee safety via mathematical bounds *before* LLMs are allowed to augment the output.

## 3. Current Architecture
The architecture is aggressively decoupled:
- **Execution vs. Knowledge**: The OS kernel contains zero hardcoded domain logic. All business rules, templates, and methodologies are injected at runtime via modular **Knowledge Packs**.
- **Engine Purity**: The internal engines (Rule, Checklist, Template, Reasoning) are purely deterministic execution environments.
- **Skill Abstraction**: Every capability (whether it's a simple regex check or a future API call) is wrapped in a standardized `ISkill` interface to guarantee predictable inputs and outputs.

## 4. Core Components
- **Kernel**: The central orchestrator that manages the EventBus, StateMachine, and subsystem registries.
- **Workflow**: The `WorkflowRunner` executes multi-step JSON pipelines, halting immediately upon step failure.
- **Skills**: Wrappers (`ISkill`) for discrete tasks. System skills currently map to internal deterministic engines.
- **Rules**: The `RuleEngine` evaluates strict boolean constraints (e.g., `exists`, `equals`, `regex`) against incoming facts.
- **Checklist**: The `ChecklistEngine` evaluates nested requirements, ensuring dependencies are met before progression.
- **Templates**: The `TemplateEngine` renders markdown artifacts from validated variables.
- **Knowledge Packs**: JSON structures that define domain rules (e.g., HarbourLink engineering standards).
- **Reasoning Packs**: Formal JSON methodologies (e.g., De Bono's Six Thinking Hats) executed by the `ReasoningEngine` to synthesize insights and gate execution via the `ConsensusService`. (Note: Reasoning and Consensus gates only apply to reasoning-enabled workflows. Simple deterministic workflows do not require Reasoning and bypass this entirely.)

## 5. Current CLI Commands
```bash
# General OS Run (Stub)
we-agent run "<query>"

# Generic Workflow Execution
we-agent workflow run <workflowFile> --input <inputFile> --output <outputFile>

# Service Report Generation
we-agent service-report generate --input <inputFile> --output <outputFile>
```

## 6. Example: Service Report Generation
The OS can currently generate a HarbourLink Routine Service Report offline:
```bash
node ./dist/cli/index.js service-report generate \
  --input examples/service-report/harbourlink-routine-service.input.json \
  --output output/harbourlink-report.md
```

## 7. Current Project Structure
```text
├── src/               # Core OS kernel, engines, and CLI
├── docs/              # Architectural Decision Records (ADRs) and specs
├── knowledge/         # Externalized Knowledge Packs and Reasoning Frameworks
├── workflows/         # Deterministic JSON workflow pipelines
├── examples/          # Mock inputs and expected test data
├── tests/             # Vitest test suite (100% pass rate)
└── package.json       # Dependencies and build scripts
```

## 8. Implemented Features
- [x] Full execution pipeline (Kernel -> WorkflowRunner -> SkillRegistry).
- [x] Deterministic validation (RuleEngine & ChecklistEngine).
- [x] Artifact generation (TemplateEngine).
- [x] Offline Reasoning Framework (Six Hats via ReasoningEngine).
- [x] User-facing CLI with file I/O capabilities.

## 9. Current Limitations
- **Offline Only**: There are currently zero integrations with Local LLMs (Ollama) or Cloud LLMs (OpenAI).
- **No Unstructured Ingestion**: The system strictly requires structured JSON inputs (it cannot yet read messy OCR or PDF text).
- **No Dynamic Subagents**: Execution is strictly bound to predefined JSON workflows; agents cannot "plan" dynamically.
- **No I/O Plugins**: Filesystem interactions are limited to the CLI wrapper; internal tools cannot read/write arbitrarily.

## 10. Roadmap (v0.2)
The next major iteration (v0.2) will pivot towards an **Agent-First** expansion. Having proven the deterministic OS boundary, we will aggressively focus on delivering high-value Business Agents:
- **Service Report Agent**
- **Email Agent**
- **Quotation Agent**
- **Inspection Agent**
- **Bootstrap Agent**
- **Budget Manager Agent**

## 11. Development Principles
- **No Deletion**: We append and deprecate; we do not delete historical context.
- **MVP Boundaries**: We build the smallest, most deterministic version of a component before scaling it.
- **Test-Driven**: Features are not complete until Vitest passes.
- **Documentation as Code**: Architecture is formalized via ADRs *before* implementation begins.
