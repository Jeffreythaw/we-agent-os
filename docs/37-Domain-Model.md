# Domain Model

## Hierarchy
The core domain hierarchy dictates how WE Agent OS organizes state and execution:

```text
Workspace
  ├── Projects
  │     ├── Personas
  │     ├── Knowledge
  │     ├── Artifacts
  │     └── Executions
  ├── Global Skills
  ├── Global Workflows
  ├── Global Policies
  ├── Global Providers
  └── Global Tools
```

## Description
- **Workspace**: The highest-level tenant boundary. Contains everything for a specific user or organization.
- **Projects**: The site, client, or job boundary within a Workspace. Projects contain specific Personas, Knowledge, Artifacts, and execution histories.
- **Global Assets**: Skills, Workflows, Policies, Providers, and Tools exist at the Workspace level, making them reusable across all Projects within that Workspace.
