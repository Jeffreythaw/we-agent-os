# ADR 034: Business Analysis Layer

## Status
Accepted

## Context
As the OS scales to handle complex multi-file projects, we need a distinct layer responsible for translating human intent into structured deterministic facts *before* execution begins.

## Decision
We introduce the **Business Analysis (BA) Layer**. This layer sits above the Execution Loop and encompasses the Discovery Engine, Question Engine, and Requirement Analyzer. Its sole output is verified `facts` that meet the Definition of Ready.

## Consequences
- **Pros**: Clean separation of concerns (Analysis vs Execution). Allows humans to interact natively with the BA layer via Q&A until the math (Requirement Score) proves the system is ready to code.
- **Cons**: Adds architectural overhead prior to the execution pipeline.
