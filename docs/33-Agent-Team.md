# Agent Team

## 1. Concept
Architecture v2 introduces support for Agent Teams—multiple distinct Agent Processes working concurrently or sequentially on a shared Workflow.

## 2. Team Dynamics
- **Roles**: Distinct Personas working together (e.g., a "Coder" agent and a "Reviewer" agent).
- **Communication**: Agents pass messages and hand off tasks via the Event Bus.
- **Shared Memory**: The Workspace memory provides a shared blackboard for the team to collaborate on state and context.

## 3. Orchestration
The Kernel's Scheduler manages the lifecycle of the team, ensuring dependencies in the Workflow graph are respected before waking up downstream agents.
