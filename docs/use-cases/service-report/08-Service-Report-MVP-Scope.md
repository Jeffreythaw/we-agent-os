# Service Report MVP Scope

## Bounded Implementation Constraints

To ensure successful delivery of Phase 3, the HarbourLink Routine Service Report must adhere strictly to the following MVP bounds:

### Supported Features
- **Structured Input Only**: The system will accept data purely as predefined JSON facts and variables.
- **Markdown Artifacts**: The final output is strictly a `.md` text artifact.
- **System Skills**: The workflow relies exclusively on the built-in `system.rule_check`, `system.checklist_check`, and `system.template_render` skills.

### Excluded Features (Not in MVP)
- **Unstructured Input**: No PDF parsing or LLM-based OCR extraction from images.
- **Exporting**: No conversion to PDF or Microsoft Word formats.
- **AI/LLM Providers**: Absolutely no calls to external LLMs. The workflow is fully deterministic.
- **Database/Storage**: No persistent writes to an external SQL/NoSQL database. Artifacts are held in memory/file system.
- **External Notifications**: No email or slack webhooks.

By adhering to these bounds, we ensure the core Workflow Pipeline operates flawlessly before escalating to unpredictable AI paths.
