# Service Report Knowledge Pack

This document separates the static domain knowledge and style guidelines of WE Engineering from the workflow execution code. While the MVP relies on structured JSON input, future AI-Escalation paths will use this Knowledge Pack to augment prompts when interpreting unstructured text.

## WE Engineering Standards

### 1. Document Format
All service reports must be generated in standardized GitHub Flavored Markdown (GFM) format to ensure portability across internal documentation systems. Tables must be used for tabular asset/photo correlation.

### 2. Writing Style
- **Objective and Clear**: Observations must state facts without assumption (e.g., "Pump seal leaking at 5ml/min", not "Pump looks broken").
- **Tense**: Use past tense for completed service actions.
- **Tone**: Professional, formal, strictly engineering terminology.

### 3. Photo Standard
- All field photos must be well-lit.
- Photos must contain corresponding Asset IDs.
- If a fault is reported, at least one photo must clearly illustrate the specific fault zone.

### 4. Recommendation Standard
- Recommendations must be actionable.
- They must include a clear priority level (e.g., [URGENT], [ROUTINE]).

### 5. Quality Checklist
- Never omit the technician signature/name block.
- Always include the contract ID header.
