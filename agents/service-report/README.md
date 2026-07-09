> Superseded by the Business Agent Pack files. Kept for historical traceability.

# Service Report Agent v1

## 1. What this Agent Does
The Service Report Agent automates the generation of structured engineering service reports. It ensures that all generated reports mathematically comply with standard operating procedures (SOPs), rejecting any report that is missing critical technician data, photographs, or reference numbers.

## 2. Current Supported Scope
This agent is currently optimized exclusively for the **HarbourLink (HBL)** project. It supports generating the **Routine Contract Service Report** using an offline, purely deterministic workflow.

## 3. Required Input File
The agent does not yet accept raw text or emails. It requires a strictly formatted JSON input file containing the facts of the service visit:
```json
{
  "facts": {
    "referenceNumber": "SVC/HBL/072026/001",
    "projectCode": "HBL",
    "reportDate": "2026-07-08",
    "technician": "John Doe",
    "equipmentType": "FCU/AHU",
    "observations": "Filter replaced and coils cleaned.",
    "recommendations": "Recommend replacing belt next quarter.",
    "photos": [
      {
        "url": "photo1.jpg",
        "caption": "Filter before cleaning"
      }
    ]
  }
}
```

## 4. CLI Command
```bash
we-agent service-report generate --input <inputFile> --output <outputFile>
```

## 5. Example Command
```bash
node ./dist/cli/index.js service-report generate \
  --input examples/service-report/harbourlink-routine-service.input.json \
  --output output/harbourlink-report.md
```

## 6. Output File
The agent generates a fully formatted **Markdown (.md)** document containing the templated data, which is written directly to the filesystem at the path specified by `--output`.

## 7. Success Behavior
If the input data passes all strict rule evaluations and checklist constraints, the agent will:
1. Print `Success! Service report saved to <outputFile>` to the terminal.
2. Save the final Markdown artifact to disk.

## 8. Failure Behavior
If the input data is missing required fields (e.g., missing a `referenceNumber` or missing a `caption` on a photo), the agent will:
1. Halt execution immediately.
2. Print the exact validation error to the terminal.
3. **Not** write any output file to disk, preventing corrupt or incomplete reports from being saved.

## 9. Known Limitations
- **No LLM / OCR**: You cannot feed the agent a messy PDF or an unstructured email. It requires strict JSON.
- **Markdown Only**: The agent cannot natively generate PDF or Microsoft Word documents.
- **Offline Only**: The agent does not connect to a database to fetch historical records, nor does it automatically email the finalized report to a client.

## 10. Future Roadmap
As the WE Agent OS core evolves, this agent will receive the following upgrades:
- **v2**: AI-driven Extraction Skill to automatically convert messy technician emails into the required JSON schema.
- **v3**: PDF and `.docx` generation plugins.
- **v4**: Automated dispatch capabilities (sending the finalized report via email).
