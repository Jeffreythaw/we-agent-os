# Pattern Extraction Guide

When a repository passes the Evaluation Criteria, we do not copy its source code. Instead, we extract its architectural patterns and translate them into WE Agent OS paradigms.

## Step 1: Isolate the Mechanism
Identify exactly how the external framework solves a specific problem. Ignore the language syntax and focus on the data flow.
*Example: "The framework uses a YAML file to define prompt variables and few-shot examples."*

## Step 2: Map to WE Agent OS Entities
Translate the isolated mechanism into our allowed primitives:
- **Is it a step-by-step process?** -> Map to a `Workflow` JSON.
- **Is it a discrete capability?** -> Map to an `ISkill` interface.
- **Is it a validation check?** -> Map to the `RuleEngine` or `ChecklistEngine`.
- **Is it domain expertise or prompts?** -> Map to a `KnowledgePack`.
- **Is it a heuristic framework?** -> Map to a `ReasoningPack`.

## Step 3: Strip Dependencies
Rewrite the pattern using only native Node.js/TypeScript modules. Discard any reliance on external orchestration libraries.

## Step 4: Enforce Determinism
If the original pattern relied on an LLM to "guess" the next step, you must replace that mechanism with a deterministic State Machine transition or a mathematically evaluated RuleEngine gate.
