# Workspace System

## 1. Concept
The Workspace is the primary organizational boundary in WE Agent OS Architecture v2. It acts as an isolated sandbox and project environment for a specific goal or domain.

## 2. Contents of a Workspace
A Workspace is self-contained and holds:
- **Personas**: The profiles the agents can adopt.
- **Skills**: Reusable SOPs (Standard Operating Procedures).
- **Workflows**: Directed graphs composing multiple Skills.
- **Memory**: Context, episodic logs, and vector data specific to the workspace.
- **Policies**: Workspace-specific security and approval rules.
- **Secrets**: Encrypted credentials scoped strictly to this workspace.

## 3. Isolation & Security
- Workspaces provide strict tenant isolation. An agent executing in Workspace A cannot access the memory, secrets, or policies of Workspace B unless explicitly bridged by the user.
