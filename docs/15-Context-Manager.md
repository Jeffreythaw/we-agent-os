# Context Manager

## 1. Purpose
The Context Manager handles the retrieval, compression, summarization, chunking, and budgeting of context sent to LLM Providers, ensuring that agents never exceed token limits while retaining critical information.

## 2. Responsibilities
- Manage the "Working Memory" payload sent in every LLM request.
- Dynamically summarize older conversation turns when token budgets are nearing capacity.
- Retrieve relevant semantic memory blocks via vector search.
- Inject system prompts and skill instructions dynamically based on the current workflow step.

## 3. Inputs and Outputs
- **Inputs**: Raw conversation history, retrieved documents, maximum context window size.
- **Outputs**: A highly optimized, token-counted array of messages ready for the LLM API.

## 4. Core Concepts
- **Context Window**: The maximum token capacity of the chosen LLM.
- **Context Budgeting**: Allocating portions of the window for System Prompts, History, Tool Results, and output buffers.
- **Sliding Window Summarization**: Compressing old messages into a single summary block.

## 5. Interfaces/Contracts at High Level
- `buildContext(agentId: string, budget: number): Message[]`
- `addInteraction(agentId: string, message: Message): void`
- `forceSummarize(agentId: string): void`

## 6. Failure Handling
- If a single document exceeds the maximum context window, the Context Manager automatically chunks it or throws a truncation warning.
- Graceful degradation: if vector retrieval fails, it falls back to purely episodic (short-term) memory.

## 7. Best Practices
- Reserve a strict percentage (e.g., 20%) of the context window solely for the LLM's output generation to prevent mid-thought cutoffs.
- Cache token counting calculations to avoid high CPU overhead.

## 8. Risks and Anti-patterns
- **Anti-pattern**: Blindly appending tool outputs without limits, leading to sudden `context_length_exceeded` errors.
- **Risk**: Over-summarizing, resulting in the agent losing critical task instructions or user preferences.

## 9. Relationship with other WE Agent OS Components
- Supplies formatted input to the **Provider System**.
- Reads short and long-term state from the **Memory System**.
- Tracks token usage via the **Observability** system.
