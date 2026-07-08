# Memory System

The Memory System represents the **File System** of the WE Agent OS. It dictates how context is stored, retrieved, and persisted across process lifecycles.

## 1. Skill Files (ROM)
Read-only standard operating procedures defined in Markdown with YAML frontmatter.
- Loaded at Agent boot.
- Defines the Agent's purpose, rules, and required Device Drivers.

## 2. Working Memory (RAM)
The current conversation history and scratchpad.
- Highly volatile.
- Managed by the Kernel to prevent exceeding the LLM context window (via summarization or truncation).

## 3. Episodic Memory (Log Files)
Saved artifacts of past executions.
- Written by the Agent upon task completion.
- Used for few-shot prompting in future tasks.

## 4. Semantic Memory (Vector File System)
Long-term, searchable storage.
- When an agent learns a new fact or codebase pattern, it writes a chunk to the semantic memory.
- Future agents can query this vector file system to retrieve context dynamically.
