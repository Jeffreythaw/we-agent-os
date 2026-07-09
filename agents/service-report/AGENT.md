# Service Report Agent

## Agent Purpose
The Service Report Agent automates the deterministic generation of engineering service reports. It enforces strict compliance with predefined rules and checklists, ensuring that no report is finalized unless all required field data, photographs, and technician observations are mathematically present and valid.

## Scope
- **Report Types:** Routine Contract Service Report (Only)
- **Projects:** HarbourLink (Project Code: HBL) (Only)

## Section Skills
The agent's generation capabilities are conceptually subdivided into documentation-only section-level skills located in `skills/` (e.g., `reference-number`, `findings`, `html-template`). These skills define the granular rules, constraints, and examples for each portion of the report.

## Future Roadmap
- **v2 (Extraction Skill)**: LLM integration to ingest unstructured technician notes (via text or voice) and automatically map them into the required strict JSON schema.
- **v3 (Artifact Engine)**: PDF and Word generation capabilities.
- **v4 (Network Skills)**: Automated email dispatch upon successful generation.
- **v5 (Database Skills)**: RAG ingestion to automatically pull the previous service report's recommendations for continuity.
