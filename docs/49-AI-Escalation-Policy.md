# AI Escalation Policy

## 1. The Default Stance
By default, **no escalation to AI is allowed**. The OS will attempt to complete tasks using deterministic Workflows, Rules, Checklists, and Templates.

## 2. Conditions for Escalation
The Provider Engine is only invoked when one of the following conditions is met:
1. Deterministic rules cannot solve the task.
2. Natural language generation is strictly required.
3. Summarization or interpretation of unstructured data is required.
4. The user explicitly requests AI reasoning.

## 3. Approval and Provider Selection
When escalation is permitted by the above conditions, the OS must still evaluate the financial and privacy costs:
- **Local First**: The system must always prefer a local model (e.g., Ollama) first if it is available and capable.
- **Approval for External/Paid**: If a paid or external provider (e.g., OpenAI, Anthropic) is required, the OS must ask the user for explicit approval via the Approval Gate.
- **Audit Logging**: Every escalation must log the exact reason for the escalation to the Audit Engine.
