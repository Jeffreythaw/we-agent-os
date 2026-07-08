# Skill System

## 1. Concept
Skills are atomic, reusable building blocks of agent behavior. They represent standardized operating procedures (SOPs) or specific, bounded capabilities (e.g., "Review a Pull Request", "Scaffold a TypeScript project").

## 2. Architecture
- **Declarative**: Defined in YAML/Markdown.
- **Stateless**: Skills do not hold execution state; they are executed by an Agent Process.
- **Parameterizable**: They accept inputs and return standardized outputs.
- **Tool Bindings**: Skills explicitly declare which Device Drivers (Tools/MCP) they require.

## 3. Reusability
Because Skills are decoupled from Personas and Agents, the "Review PR" skill can be executed by the "Senior Engineer" persona or the "Security Auditor" persona, yielding different stylistic results but following the same fundamental procedure.
