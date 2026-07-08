# ADR 004: Loop Engineering over Linear Prompting

## Status
Accepted

## Context
Zero-shot and few-shot linear prompting are insufficient for complex, multi-step work tasks. Agents hallucinate, APIs fail, and environments change during execution.

## Decision
Adopt a "Loop Engineering" architecture (Plan → Execute → Check → Improve). Agents will not just output actions; they will output an intent, execute it, observe the result, and self-correct if the result does not match the intent. The Kernel Scheduler enforces this loop.

## Consequences
- **Positive**: Massive increase in reliability and success rates for complex tasks.
- **Negative**: Increased token usage (cost) and latency due to verification steps. Risk of infinite loops if the checking logic is flawed.
