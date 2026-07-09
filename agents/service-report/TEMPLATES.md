# Templates

This template is rendered by the `TemplateEngine` during `step-3-render` of the workflow.

```markdown
# HarbourLink Service Report

**Reference Number:** {{referenceNumber}}
**Project:** {{projectCode}}
**Date:** {{serviceDate}}
**Technician:** {{technicianName}}
**Equipment:** {{equipmentType}}

## Observations
{{observations}}

## Recommendations
{{recommendations}}

## Photos
{{photoCaptions}}
```
