# Expected Output

The agent outputs a fully formatted Markdown (`.md`) artifact based on the `TEMPLATES.md` structure.

**Schema:**
- Format: Markdown
- Sections:
  - Header with Reference Number, Project, Date, Technician, Equipment
  - Observations section
  - Recommendations section
  - Photos section

**Example:**
```markdown
# HarbourLink Service Report

**Reference Number:** SVC/HBL/072026/001
**Project:** HBL
**Date:** 2026-07-08
**Technician:** John Doe

## Observations
Filter replaced and coils cleaned.

## Recommendations
Recommend replacing belt next quarter.

## Photos
Photo 1: Filter before cleaning
```
