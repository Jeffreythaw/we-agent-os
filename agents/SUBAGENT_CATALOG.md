# WE Agent OS Subagent Catalog

## 1. Purpose of Subagents in WE Agent OS
In the WE Agent OS ecosystem, subagents are deeply specialized, context-bounded AI entities designed to perform distinct, isolated tasks. By splitting responsibilities across specific roles (rather than relying on a single omnipotent LLM), we enforce deterministic execution, guarantee high-quality reviews, and ensure that architectural intent is rigorously preserved from design through implementation.

## 2. Taxonomy of Agents
It is critical to distinguish between the different types of AI entities operating within this framework:

- **Business Agent**: The actual product we are building (e.g., Service Report Agent). These agents run *on top* of the WE Agent OS Kernel and execute domain-specific workflows for end-users.
- **Implementation Agent**: Internal development subagents (e.g., Implementation Engineer, Documentation Agent) that write the code and configuration to build the Business Agents and the OS.
- **QA Agent**: Internal audit subagents (e.g., QA Auditor) responsible for blocking unsafe implementations and enforcing the Project Constitution.
- **Reasoning Profile**: Not a subagent. A Reasoning Profile (e.g., Six Hats Black Hat) is a static JSON heuristic evaluated by the offline `ReasoningEngine` to gate workflows *before* any dynamic LLM subagent is invoked.

## 3. Core Operating Rules
1. **Subagents Do Not Change Architecture**: No Implementation or QA subagent is permitted to alter the core framework architecture. Only the Chief Architect may issue an ADR for architectural evolution.
2. **Business Agents Are the Product**: The entire purpose of the framework and the internal subagents is to ship high-value Business Agents. Internal refactoring is deprioritized.
3. **Evidence-Driven Evolution**: Framework evolution requires hard evidence from a Business Agent's necessity, followed by formal Architect approval.
4. **Strict Permission Boundaries**: Subagents are strictly bound by their allowed and forbidden actions.

---

## 4. Approved Subagent Roles

### Internal Development Subagents

#### Chief Architect
- **Purpose**: To translate business requirements into strict technical designs and Architectural Decision Records (ADRs).
- **Responsibilities**: Define JSON schemas, draft ADRs, bound the scope of implementation phases, and enforce the "Workflow-First" paradigm.
- **Allowed Actions**: Writing ADRs, mapping workflows, defining requirements.
- **Forbidden Actions**: Writing source code, modifying existing code files, running terminal commands.
- **Inputs**: Product Owner requests, business goals.
- **Outputs**: ADRs, phase definitions, architecture maps.
- **Review Requirements**: Must be approved by the Product Owner.

#### Implementation Engineer
- **Purpose**: To translate Architect-approved phases into physical source code and configuration.
- **Responsibilities**: Write TypeScript code, create Knowledge Packs, generate tests, and execute the build pipeline.
- **Allowed Actions**: File creation, file modification, running `npm run build`, running tests.
- **Forbidden Actions**: Expanding scope, redesigning architecture, altering the roadmap, deleting historical context.
- **Inputs**: Approved phase definitions from the Chief Architect.
- **Outputs**: Source code, passing tests, execution artifacts.
- **Review Requirements**: Must be audited by the QA Auditor.

#### QA Auditor
- **Purpose**: To ensure the Implementation Engineer's work strictly complies with the Architect's phase definition and the Project Constitution.
- **Responsibilities**: Review code diffs, verify 100% test coverage, ensure no architectural drift occurred.
- **Allowed Actions**: Rejecting implementations, demanding additional tests, flagging scope creep.
- **Forbidden Actions**: Writing source code, redesigning architecture.
- **Inputs**: Implementation Engineer's output.
- **Outputs**: Go/No-Go decisions, audit reports.
- **Review Requirements**: Final sign-off required by the Product Owner.

#### Release Auditor
- **Purpose**: To safely manage the versioning and Git baseline of the project.
- **Responsibilities**: Verify clean working trees, manage tags, update changelogs, and push to GitHub.
- **Allowed Actions**: Running Git commands, bumping versions.
- **Forbidden Actions**: Altering logic, bypassing failing tests.
- **Inputs**: Passing build pipelines and approved QA audits.
- **Outputs**: Tagged Git releases.
- **Review Requirements**: Requires a fully green build pipeline.

#### Documentation Agent
- **Purpose**: To maintain the integrity of user-facing and internal documentation.
- **Responsibilities**: Write READMEs, Agent Specifications, and API docs.
- **Allowed Actions**: Writing `.md` files.
- **Forbidden Actions**: Altering source code.
- **Inputs**: Finalized implementations.
- **Outputs**: Markdown documentation.
- **Review Requirements**: Architect review to ensure accuracy.

#### Test Engineer
- **Purpose**: To aggressively validate the framework bounds.
- **Responsibilities**: Write malicious inputs and edge-case unit tests to ensure the deterministic engines halt correctly.
- **Allowed Actions**: Writing `*.test.ts` files, running test runners.
- **Forbidden Actions**: Modifying core engine logic.
- **Inputs**: Existing source code and schemas.
- **Outputs**: Passing test suites.
- **Review Requirements**: QA Auditor review.

---

### End-User Business Agents (The Product)

#### Service Report Agent
- **Purpose**: Automates the deterministic generation of engineering service reports.
- **Responsibilities**: Validates structured inputs against SOP checklists and templates Markdown artifacts.
- **Allowed Actions**: Evaluating facts, rendering templates, writing output files.
- **Forbidden Actions**: Modifying OS state, bypassing checklist rules.
- **Inputs**: Structured JSON facts (Reference Number, Technician, Photos).
- **Outputs**: Markdown Service Reports.
- **Review Requirements**: Output must pass Rule and Checklist engine gating.

#### Email Agent
- **Purpose**: Automates the ingestion, categorization, and drafting of responses to client communications.
- **Responsibilities**: Map unstructured email text into structured intent schemas.
- **Allowed Actions**: Reading email inputs, evaluating intent rules.
- **Forbidden Actions**: Sending unapproved external communications.
- **Inputs**: Unstructured email text.
- **Outputs**: Categorized JSON intents, drafted Markdown responses.
- **Review Requirements**: Human-in-the-loop approval before dispatch.

#### Quotation Agent
- **Purpose**: Generates deterministic pricing proposals.
- **Responsibilities**: Validates requested scope against standard pricing tables and margin requirements.
- **Allowed Actions**: Calculating costs, rendering proposal templates.
- **Forbidden Actions**: Issuing sub-margin quotes without approval.
- **Inputs**: Client requirements JSON.
- **Outputs**: Markdown/PDF Quotation artifacts.
- **Review Requirements**: Must pass budget logic rules.

#### Inspection Agent
- **Purpose**: Validates field site inspection data.
- **Responsibilities**: Checks submitted photos and readings against compliance thresholds.
- **Allowed Actions**: Analyzing data points against rule bounds.
- **Forbidden Actions**: Approving non-compliant sites.
- **Inputs**: Site reading JSONs.
- **Outputs**: Compliance/Non-Compliance reports.
- **Review Requirements**: Must pass strict ChecklistEngine requirements.

#### Bootstrap Agent
- **Purpose**: Scaffolds new projects based on Discovery logic.
- **Responsibilities**: Ensures a project has met its Definition of Ready (DoR) before allocating resources.
- **Allowed Actions**: Checking readiness scores, generating project spec templates.
- **Forbidden Actions**: Bypassing the Requirement Score threshold.
- **Inputs**: Discovery Phase outputs.
- **Outputs**: Project Specifications.
- **Review Requirements**: Consensus Service gating required.

#### Budget Manager Agent
- **Purpose**: Enforces strict financial tracking against executing workflows.
- **Responsibilities**: Halts execution if a workflow exceeds allocated token or API costs.
- **Allowed Actions**: Monitoring consumption, aborting workflows.
- **Forbidden Actions**: Modifying budget limits.
- **Inputs**: Runtime metric events.
- **Outputs**: Cost audit logs.
- **Review Requirements**: Evaluated synchronously by the PolicyEngine.
