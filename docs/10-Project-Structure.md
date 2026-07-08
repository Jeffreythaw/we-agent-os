# Recommended Project Structure

To maintain the OS metaphor and ensure modularity, the TypeScript project should adhere to the following structure:

```text
src/
├── kernel/            # The Core Orchestrator
│   ├── scheduler.ts   # Loop Engineering engine
│   ├── ipc.ts         # Message routing
│   └── permissions.ts # Approval Gate logic
├── process/           # Agent runtime
│   ├── agent.ts       # Agent lifecycle management
│   └── context.ts     # Working memory management
├── drivers/           # Tools and MCP
│   ├── tools/         # Native TS tools
│   └── mcp/           # MCP client wrappers
├── fs/                # Memory System
│   ├── skills.ts      # Markdown/YAML parsing
│   └── vector.ts      # Semantic memory interfaces
└── providers/         # LLM Abstractions
    ├── index.ts       # Provider Router
    └── impl/          # OpenAI, Ollama, etc.
```

## Best Practices
- **Strict Typing**: Use Zod extensively at the boundaries (IPC, Drivers, Providers).
- **No Provider Bleed**: The `process/` and `kernel/` layers must never import provider-specific SDKs (e.g., `openai`).
- **Stateless Kernel**: The Kernel should be able to resume a suspended process from disk if the physical Node server restarts.

## Risks
- Context window explosion in Working Memory.
- Infinite loops in the Scheduler if the `Improve` step fails repeatedly.
- Over-permissive Approval levels leading to destructive actions.
