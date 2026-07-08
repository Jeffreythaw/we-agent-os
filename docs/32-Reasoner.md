# Reasoner

## 1. Concept
The Reasoner is the tactical decision-making engine that sits between the Planner's graph and the actual Agent Processes.

## 2. Responsibilities
- **Provider Selection**: Dynamically route tasks to the most cost-effective or capable provider (e.g., using Ollama for simple text formatting, but GPT-4 for complex coding).
- **Strategy Selection**: Decide *how* to execute a step (e.g., fast one-shot execution vs. multi-step reflection).
- **Fallback Handling**: Analyze execution failures and determine whether to retry, switch providers, or escalate to the human user.
