# ADR 008: Centralized Priority Scheduler

## Status
Accepted

## Context
When multiple agents or parallel tasks are active, they compete for the same rate-limited LLM API endpoints and local CPU resources. Without scheduling, the system will hit 429 Too Many Requests instantly.

## Decision
Introduce a central Scheduler that ticks continuously, pulling from a priority queue. Tasks are yielded to the Scheduler to decide the optimal execution order based on budgets and resource locks.

## Consequences
- **Positive**: Smooths out API spikes, respects rate limits natively, and allows immediate preemption for critical user interrupts.
- **Negative**: Adds latency to task execution as tasks must wait for the next Scheduler tick.
