# Agent Manifest

## 1. Purpose
The Agent Manifest is the definitive, declarative configuration file for an Agent Process. It cleanly separates the agent's identity, permissions, and instructions from the core OS source code.

## 2. Responsibilities
- Define the agent's name, description, and primary LLM model.
- Declare the specific tools, skills, and workflows the agent is allowed to access.
- Define evaluation criteria and automated tests for the agent's behavior.
- Link to the specific system prompt (`prompt.md`) governing the agent's persona.

## 3. Inputs and Outputs
- **Inputs**: YAML configuration files authored by users or developers.
- **Outputs**: Parsed configuration objects used by the Kernel to boot an Agent Process.

## 4. Core Concepts
- **Separation of Concerns**: Configuration (`manifest.yaml`), instructions (`prompt.md`), standard operating procedures (`skills`), and validation (`tests`).
- **Declarative Infrastructure**: Agents are defined by what they are, not how they are coded.

## 5. Interfaces/Contracts at High Level
- `parseManifest(filePath: string): AgentManifestObject`
- `validateManifest(manifest: unknown): boolean` (using Zod)

## 6. Failure Handling
- If a manifest is malformed or references non-existent tools, the Kernel refuses to boot the agent and throws a validation error upon startup.

## 7. Best Practices
- Keep the `manifest.yaml` purely structural. Move all natural language instructions to a separate `prompt.md` file for easier iteration.
- Version control Agent Manifests to track changes in agent behavior over time.

## 8. Risks and Anti-patterns
- **Anti-pattern**: Hardcoding agent configurations in TypeScript files rather than using external Manifests.
- **Risk**: Defining overly broad tool access in the manifest (e.g., `tools: ["*"]`), violating the principle of least privilege.

## 9. Relationship with other WE Agent OS Components
- Loaded by the Kernel into the **Context Manager** upon boot.
- Tool requests in the manifest are validated against the **Capability Registry**.
- Defines the default execution limits enforced by the **Resource Manager**.
