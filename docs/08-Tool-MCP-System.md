# Tool & MCP System

In the WE Agent OS metaphor, Tools and MCP servers act as **Device Drivers**. They provide standard interfaces for Agents to interact with the outside world.

## Standard Tools
Built-in TypeScript functions that register their schema (via Zod) with the Kernel.
- Run in the same environment as the Kernel.
- Highly performant.
- Tightly integrated with the Approval System.

## MCP (Model Context Protocol)
A standard for building external, out-of-process device drivers. 
- MCP servers can be written in any language.
- The Kernel communicates with them over stdio or HTTP.
- Allows Agents to interface with specialized local databases, enterprise systems, or remote APIs without requiring custom TypeScript integrations.

## Plugin Model
Agents do not possess tools inherently. The Kernel dynamically mounts Device Drivers (Tools/MCP) into the Agent's Process Space based on the Agent's Skill File requirements during the Initialization phase.
