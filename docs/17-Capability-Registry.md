# Capability Registry

## 1. Purpose
The Capability Registry acts as the service discovery layer of WE Agent OS. It stores and resolves the available capabilities of agents, tools, providers, skills, workflows, and plugins.

## 2. Responsibilities
- Parse and register tools (Device Drivers) and their JSON schemas upon system boot.
- Resolve capability requests (e.g., "give me a tool that can read PDFs").
- Validate that required MCP servers are online and responsive.
- Maintain a catalog of available specialized Agent Manifests for dynamic workflow orchestration.

## 3. Inputs and Outputs
- **Inputs**: Tool registrations, MCP server connection strings, agent manifests.
- **Outputs**: Instantiated tool closures, JSON schemas for Context Manager injection, resolved agent definitions.

## 4. Core Concepts
- **Capability**: A distinct action or skill (e.g., `fs.read`, `github.pr`).
- **Discovery**: The process by which the OS determines what it is capable of doing dynamically.
- **Namespacing**: Preventing tool naming collisions (e.g., `mcp_serverA_read` vs `native_fs_read`).

## 5. Interfaces/Contracts at High Level
- `registerTool(tool: ToolDefinition): void`
- `getToolSchema(toolName: string): JSONSchema`
- `resolveCapabilities(requirements: string[]): Tool[]`

## 6. Failure Handling
- If a workflow requires a capability that is not registered, the Registry throws a `CapabilityNotFoundError` during the Workflow Planning phase, preventing the agent from booting into an impossible state.
- Gracefully handles disconnected MCP servers by marking those capabilities as `OFFLINE`.

## 7. Best Practices
- Load capabilities lazily if they require heavy initialization.
- Provide descriptive descriptions in tool schemas to aid the LLM in selecting the correct tool.

## 8. Risks and Anti-patterns
- **Anti-pattern**: Hardcoding tool names directly in agent prompts instead of dynamically injecting registered schemas.
- **Risk**: Namespace collisions if multiple MCP servers expose tools with the same name.

## 9. Relationship with other WE Agent OS Components
- Provides schemas to the **Context Manager** for injection into prompts.
- Mounts resolved capabilities into the Agent's Process Space.
- Evaluated during the **Workflow Engine** planning phase.
