# Execution Pipeline

## 1. Concept
The Execution Pipeline represents the end-to-end flow of a request in Architecture v2, from input to completion.

## 2. The Pipeline
1. **Input**: User submits a request to a Workspace.
2. **Planning**: The Planner decomposes the request into an execution graph using available Skills.
3. **Reasoning**: The Reasoner selects the optimal Providers and strategies for the graph.
4. **Scheduling**: The Kernel allocates Agent Processes, equipping them with Personas and Tools.
5. **Execution**: Agents execute the tasks, communicating via the Event Bus.
6. **Learning**: Post-execution, the Learning System analyzes the trace for optimizations.

## 3. Backward Compatibility
This pipeline wraps the Phase 1 Kernel and Event Bus. A simple Phase 1 task bypasses the Planner and Reasoner, feeding directly into a single Agent Process.
