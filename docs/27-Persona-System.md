# Persona System

## 1. Concept
A Persona is NOT an agent. Instead, a Persona is a declarative profile or identity configuration that defines the *characteristics*, *tone*, *domain expertise*, and *default behaviors* to be adopted by an Agent Process at runtime.

## 2. Core Responsibilities
- Decouple the "identity" of an assistant from the execution process.
- Allow a single generic agent binary/process to dynamically adopt different personas (e.g., "Senior DevOps Engineer", "Technical Writer") based on the task.

## 3. Relationship to Architecture v2
- An Agent Process loads a Persona configuration along with a specific Skill or Workflow to execute a task.
- Personas reside within the boundaries of a Workspace.
