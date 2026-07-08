# Service Report Skills

## Currently Available Skills (MVP)
The HarbourLink Service Report workflow can be entirely fulfilled by the built-in system skills provided by the WE Agent OS Kernel:

1. **`system.rule_check`**
   - Evaluates boolean conditions (e.g., regex on Contract ID).
2. **`system.checklist_check`**
   - Applies the QA Checklist to the payload, differentiating between warnings and hard errors.
3. **`system.template_render`**
   - Handles the injection of valid JSON payload data into the final Markdown artifact.

## Future Custom Skills (Post-MVP)
To fully replace the v2 monolith, the following custom skills will be required in future phases:

1. **`we.image_metadata_extractor`**
   - Extracts EXIF data (GPS/Timestamp) from raw image uploads to automatically satisfy photo validation rules.
2. **`we.pdf_generator`**
   - Converts the Markdown artifact into a WE Engineering branded PDF.
3. **`system.email_sender`**
   - Connects to an external SMTP service. (Requires Policy Engine `approval_required` escalation).
4. **`we.ocr_analyzer`**
   - An AI-Escalated skill that extracts serial numbers from asset photos if they are missing from the manual data entry payload.
