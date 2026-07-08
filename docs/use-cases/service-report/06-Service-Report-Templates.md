# Service Report Templates

The Markdown template dictates the exact final formatting of the HarbourLink Routine Service Report artifact. 
It utilizes the deterministic `{{path.to.variable}}` syntax provided by the WE Agent OS Template Engine.

## Markdown Template Structure

```markdown
# WE Engineering Service Report
**Contract ID:** {{contract.id}}
**Service Date:** {{service.date}}
**Technician:** {{technician.name}}

---

## 1. Observations
{{report.observations}}

## 2. Recommendations
{{report.recommendations}}

## 3. Photo Evidence
| Photo ID | Asset ID | Description |
|---|---|---|
| {{photo.1.id}} | {{photo.1.asset}} | {{photo.1.description}} |
| {{photo.2.id}} | {{photo.2.asset}} | {{photo.2.description}} |

---
**Validation Summary**
*This report was automatically validated by WE Agent OS Checklist QA.*
*Warnings:* {{validation.warning_count}}
```

## Error Handling
If an optional field like `{{report.recommendations}}` is empty, the Template Engine will safely inject an empty string and bubble up a warning, preserving the strict structural integrity of the markdown table and headers.
