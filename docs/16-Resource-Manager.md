# Resource Manager

## 1. Purpose
The Resource Manager acts as the quota and limits controller within WE Agent OS. It ensures that agents do not exceed provider API limits, local hardware constraints, or user-defined budget caps.

## 2. Responsibilities
- Track and enforce financial cost budgets per workflow or agent.
- Manage rate limits (e.g., requests per minute, tokens per minute) for remote LLM Providers.
- Manage hardware concurrency for local models (e.g., ensuring Ollama isn't overwhelmed with parallel requests).
- Implement backoff and retry mechanisms for rate-limited requests.

## 3. Inputs and Outputs
- **Inputs**: LLM request intents, provider configuration, global budget limits, current hardware metrics.
- **Outputs**: Allocation grants (permission to execute request), rate limit errors, or queueing delays.

## 4. Core Concepts
- **Budgets**: Hard limits on token spend or financial cost.
- **Token Buckets**: Algorithms used for rate limiting API calls.
- **Concurrency Locks**: Semaphores ensuring local GPUs are not OOM (Out of Memory) killed by too many concurrent inferences.

## 5. Interfaces/Contracts at High Level
- `requestAllocation(provider: string, estimatedTokens: number): Promise<boolean>`
- `recordUsage(provider: string, actualTokens: number, cost: number): void`
- `checkBudget(agentId: string): BudgetStatus`

## 6. Failure Handling
- If a budget is exceeded, the Resource Manager throws a `BudgetExceededError`, which forces the Workflow Engine to halt the agent and notify the user.
- Handles HTTP 429 (Too Many Requests) automatically by pausing the agent and re-queuing it in the Scheduler.

## 7. Best Practices
- Pre-calculate estimated token usage before sending requests to fail fast if a budget is nearing its limit.
- Cache rate limit states locally to avoid making redundant failed HTTP requests.

## 8. Risks and Anti-patterns
- **Anti-pattern**: Allowing infinite retries on HTTP 429 without exponential backoff.
- **Risk**: A runaway loop causing massive unexpected billing before the Resource Manager can sync usage.

## 9. Relationship with other WE Agent OS Components
- Tells the **Scheduler** when tasks must be delayed due to limits.
- Consumes token usage stats from the **Provider System**.
- Reports usage to the **Observability** component.
