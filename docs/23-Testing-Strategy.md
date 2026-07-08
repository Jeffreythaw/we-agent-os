# Testing Strategy

The WE Agent OS relies heavily on determinism within a non-deterministic AI environment. Testing must be rigorous across multiple paradigms.

## 1. Unit Tests
- **Scope**: State Machine, Context Manager token counters, Policy Engine rule evaluation, Agent Manifest parsing.
- **Methodology**: Standard Vitest assertions. Zero network calls. High coverage required for kernel components.

## 2. Integration Tests
- **Scope**: Event Bus pub/sub flow, Scheduler queuing, basic Agent lifecycle (Boot -> Suspended -> Completed).
- **Methodology**: Mock the LLM Provider to return deterministic JSON responses. Ensure the system transitions correctly based on the mock output.

## 3. Contract Tests
- **Scope**: Provider Router, Tool Interfaces, MCP Clients.
- **Methodology**: Ensure that the shapes of payloads sent to and received from OpenAI/Ollama APIs match the expected Zod schemas.

## 4. Snapshot Tests
- **Scope**: Observability and System Logs.
- **Methodology**: Ensure that the generated Audit Logs match the expected JSON structure over time, preventing accidental regressions in telemetry.

## 5. Approval-Gate Tests
- **Scope**: The Policy Engine and Approval System.
- **Methodology**: Security-focused tests. Mock an agent attempting to execute `fs.delete`. Assert that the Policy Engine intercepts it, the Event Bus fires an `ApprovalRequested` event, and the Agent process is successfully `SUSPENDED` until manually resumed.
