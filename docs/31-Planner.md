# Planner

## 1. Concept
The Planner is a high-level cognitive component responsible for converting ambiguous user requests into concrete execution graphs.

## 2. Responsibilities
- **Decomposition**: Break down "Build a blog" into discrete tasks.
- **Skill Matching**: Identify which available Skills in the Workspace map to the required tasks.
- **Graph Generation**: Output a DAG (Directed Acyclic Graph) of operations to be scheduled by the OS Kernel.

## 3. Distinctions
The Planner does not execute code or call tools. It only generates the roadmap, which is then handed off to the Reasoner and the Execution Pipeline.
