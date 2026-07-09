# Manual Loop Engineering Guide

## Purpose
This document outlines the standard operating procedure for executing **Manual Loop Engineering** in WE Agent OS v0.2. It allows engineers to leverage Large Language Models (LLMs) like ChatGPT or Claude to refine and update Business Agent payloads without modifying or breaking the rigid, deterministic core framework.

## When to Use
- When a generated artifact (e.g., Service Report) needs phrasing adjustments.
- When an engineer wants AI assistance to summarize data anomalies.
- When the JSON payload requires updates, but doing it by hand is tedious.

## When NOT to Use
- **Do not** use this loop to alter raw sensor data, fake engineering readings, or bypass `RULES.md` constraints.
- **Do not** use this to rewrite the core framework code.

## The Manual Loop Flow
1. **User Feedback:** The human engineer reviews the output `.md` and provides natural language feedback (e.g., "Change the recommendation to say we need a new belt").
2. **Verifier:** A human (or LLM using the Verifier Prompt) checks if the feedback breaks any rules.
3. **Planner:** The LLM (using the Planner Prompt) drafts exactly which JSON keys will be updated.
4. **Developer:** The LLM (using the Developer Prompt) outputs the new, raw JSON payload.
5. **Verifier Re-Check:** The human engineer saves the JSON and runs `we-agent <agent> generate`. The deterministic CLI framework acts as the final verifier.
6. **Approval Gate:** The human engineer approves the final generated Markdown artifact.
7. **Final Output:** Report finalized.

## File Locations
The prompt templates are completely isolated inside their respective Agent Packs to prevent framework coupling:
- `agents/service-report/prompts/`
- `agents/data-analysis/prompts/`

## Step-by-Step Usage
1. Open an external LLM interface (e.g., Claude.ai).
2. Paste the `verifier.prompt.md` along with the original `input.json` and the user's feedback.
3. Once validated, paste the `planner.prompt.md`.
4. Finally, paste the `developer.prompt.md`.
5. Copy the resulting JSON output and save it over the original `input.json`.
6. Run the local WE Agent OS CLI to deterministically render the report.

## Risk Controls
- **No Runtime Automation:** By keeping this process manual and external, we prevent infinite loops and API runaways.
- **Deterministic Check:** The local CLI (`we-agent`) remains the ultimate source of truth. If the external LLM hallucinates a bad JSON structure, the CLI simply crashes and prevents bad data from saving.

## Examples

### Service Report Example
- **Feedback:** "The technician's note about the filter was too brief, make it sound more professional."
- **Verifier:** Checks that the project code is still HBL and all required fields exist. (PASS)
- **Planner:** Plans to target the `observations` key.
- **Developer:** Outputs the JSON with `"observations": "The primary air filter was inspected and replaced to ensure optimal airflow."`

### Data Analysis Example
- **Feedback:** "I know the pH was 6.8, but don't say it's a corrosion risk, say we are monitoring it closely."
- **Verifier:** Checks that `pH_level` remains 6.8 (cannot fake the data). Checks if altering the anomaly description violates rules. (PASS)
- **Planner:** Targets `anomalies` key to update phrasing.
- **Developer:** Outputs updated JSON.
