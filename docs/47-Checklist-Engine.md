# Checklist Engine

## 1. Concept
The Checklist Engine standardizes multi-step verifications. Rather than asking an LLM to "verify the output is correct," the OS runs a strict, deterministic checklist.

## 2. Implementation
Checklists are defined in YAML or JSON as part of a Skill or Workflow. Each item on a checklist maps to a deterministic script or rule.

## 3. Interaction with AI
If an item on the checklist fails and deterministic rules cannot resolve it, the Checklist Engine may trigger the AI Escalation Policy to bring in an LLM to interpret the failure or suggest a fix.
