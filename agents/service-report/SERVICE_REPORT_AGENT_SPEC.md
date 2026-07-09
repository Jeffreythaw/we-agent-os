> Superseded by the Business Agent Pack files. Kept for historical traceability.

# Service Report Agent v1 Specification

## 1. Agent Purpose
The Service Report Agent automates the deterministic generation of engineering service reports. It enforces strict compliance with predefined rules and checklists, ensuring that no report is finalized unless all required field data, photographs, and technician observations are mathematically present and valid.

## 2. Supported Report Types for v1
- **Routine Contract Service Report** (Only)

## 3. Supported Projects for v1
- **HarbourLink (Project Code: HBL)** (Only)

## 4. Input JSON Schema
The Agent expects a strictly structured JSON payload matching the following schema:
```json
{
  "facts": {
    "referenceNumber": "string (Required)",
    "projectCode": "string (Required, must equal 'HBL')",
    "reportDate": "string (YYYY-MM-DD)",
    "technician": "string",
    "equipmentType": "string",
    "observations": "string",
    "recommendations": "string",
    "photos": [
      {
        "url": "string (Required)",
        "caption": "string (Required)"
      }
    ]
  }
}
```

## 5. Output Artifact
- **Format**: Markdown (`.md`)
- **Structure**: Predefined HarbourLink template containing Reference Number, Project, Date, Technician, Equipment, Observations, Recommendations, and dynamically numbered Photos.

## 6. Workflow Used
The Agent executes the decoupled JSON workflow located at:
`workflows/service-report/harbourlink-routine-service.workflow.json`

## 7. Validation Rules
- **RuleEngine Gating**: The workflow evaluates that `referenceNumber` exists and `projectCode` exactly equals `HBL`.
- **ChecklistEngine Gating**: The workflow iterates through the `photos` array and mathematically guarantees every photo object contains a valid `caption`.

## 8. Failure Cases
The Agent will halt execution and refuse to generate the artifact if:
- The input JSON is malformed or missing entirely.
- `referenceNumber` is empty.
- `projectCode` is not `HBL`.
- Any provided photo is missing a `caption`.

## 9. CLI Usage
```bash
we-agent service-report generate \
  --input <path-to-input.json> \
  --output <path-to-output.md>
```

## 10. Known Limitations (v1)
- **Offline Only**: Cannot connect to databases to retrieve historical records.
- **Structured Only**: Cannot parse messy OCR text or raw technician emails; requires the exact JSON schema.
- **Markdown Only**: Cannot generate PDF or Word (`.docx`) deliverables.
- **No Dispatch**: Cannot automatically email the finalized report to the client.
- **No LLM Processing**: Cannot use AI to expand on terse technician notes or correct grammar.

## 11. Future Enhancements
- **v2 (Extraction Skill)**: LLM integration to ingest unstructured technician notes (via text or voice) and automatically map them into the required strict JSON schema.
- **v3 (Artifact Engine)**: PDF and Word generation capabilities.
- **v4 (Network Skills)**: Automated email dispatch upon successful generation.
- **v5 (Database Skills)**: RAG ingestion to automatically pull the previous service report's recommendations for continuity.
