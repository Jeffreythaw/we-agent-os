# MVP Scope

This document defines the strict boundaries of the Minimum Viable Product (MVP) for WE Agent OS.

## In Scope for MVP
- **CLI Interface Only**: No Web UI or external API server.
- **Core Loop Engineering**: Agents must be able to Plan, Execute, Check, and Retry.
- **Approval System**: CLI-based prompts for Level 3 and 4 actions.
- **Basic Memory**: Working memory (in-RAM) and Episodic memory (JSON logs to disk).
- **Single Agent Execution**: Ability to load an Agent Manifest and run one agent to completion.
- **Provider Router**: Support for exactly two providers initially (OpenAI for primary, Ollama for local fallback).
- **Native Tools**: A handful of built-in filesystem and CLI execution tools.

## Out of Scope (Must NOT be built in MVP)
- **Web Interface or GUI**: No React, Next.js, or HTML rendering.
- **DAG Workflow Engine**: Complex multi-agent parallel dependency graphs are delayed to post-MVP. The MVP only supports linear, single-agent loops.
- **Vector Database Integration**: Semantic long-term memory (e.g., Pinecone, Chroma) is excluded.
- **Complex MCP Support**: Full external MCP server mounting is delayed.
- **Distributed Execution**: The system runs on a single local machine; no cloud-native Kubernetes scaling or Redis event buses.
- **Auto-escalation of Providers**: Dynamic switching from Ollama to OpenAI mid-task based on complexity is excluded.
