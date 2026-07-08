# Observability

## 1. Purpose
The Observability component is the system's "Black Box" recorder and telemetry engine. It ensures total transparency by capturing logs, traces, metrics, errors, provider usage, and execution loops.

## 2. Responsibilities
- Aggregate structured logs from all OS components.
- Generate distributed traces linking a user's prompt to workflows, agents, and individual tool calls.
- Track metrics: token counts, financial cost, loop iterations, retry counts, latency.
- Provide a queryable interface for the System Log (Audit Log).

## 3. Inputs and Outputs
- **Inputs**: Raw logs, performance spans, error stack traces, event bus payloads.
- **Outputs**: Standardized JSON logs, metrics dashboards, structured telemetry for external export (e.g., OpenTelemetry).

## 4. Core Concepts
- **Tracing**: Following a single request through multiple components (Kernel -> Workflow -> Agent -> Tool).
- **Metrics**: Quantitative data (e.g., `avg_tokens_per_loop`, `total_cost`).
- **Audit Logging**: Immutable, append-only records of security-relevant events.

## 5. Interfaces/Contracts at High Level
- `log(level: LogLevel, context: object, message: string): void`
- `startSpan(name: string, parentSpanId?: string): Span`
- `recordMetric(name: string, value: number, tags?: object): void`

## 6. Failure Handling
- The Observability system must never crash the main application. If a telemetry backend goes down, logs should be buffered locally or dropped rather than blocking agent execution.

## 7. Best Practices
- Mask sensitive PII (Personal Identifiable Information) and secrets before writing to disk.
- Use correlation IDs to tie asynchronous events together across the Event Bus.

## 8. Risks and Anti-patterns
- **Anti-pattern**: Logging massive LLM output strings at the `INFO` level, exhausting disk space.
- **Risk**: Performance degradation if logging I/O blocks the Node.js event loop.

## 9. Relationship with other WE Agent OS Components
- Subscribes to the **Event Bus** to automatically capture all state transitions.
- Used by the **Resource Manager** to audit token usage.
- Writes the official "System Log" referenced in the OS vision.
