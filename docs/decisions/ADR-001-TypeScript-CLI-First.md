# ADR 001: TypeScript and CLI First

## Status
Accepted

## Context
We need a robust, typed foundation for building the WE Agent OS. Python is popular in the AI space, but TypeScript offers better structural typing, easier integration with web ecosystems, and a strong CLI ecosystem (Commander, Zod).

## Decision
We will build the core kernel and processes using TypeScript. The initial entry point will be a Node.js CLI application rather than a Web GUI, to focus on the core orchestration logic and loop engineering without UI overhead.

## Consequences
- **Positive**: Strict typing of LLM outputs (via Zod). Easier distribution via npm. Familiar to web developers.
- **Negative**: Missing out on some Python-only ML libraries (though we rely on APIs for inference anyway).
