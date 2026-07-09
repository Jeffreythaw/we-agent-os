# Loop Engineering

When handling updates or incorporating ExtractionSkills in future versions, the Service Report Agent will follow the strict Loop Engineering Method:

1. **User Feedback**: User reviews the generated Service Report artifact.
2. **Verifier Checks**: Verifier Agent checks the feedback against `RULES.md` and `LIMITATIONS.md` (e.g. must remain HBL project, must not skip photos).
3. **Planner Correction Plan**: Planner Agent drafts an update to the JSON facts based on feedback without violating constraints.
4. **Developer Applies Fix**: Developer Agent modifies the JSON facts and triggers re-render via `WORKFLOW.json`.
5. **Verifier Re-checks**: Verifier Agent confirms the new artifact still passes all `CHECKLISTS.md` items and rules.
6. **Approval Gate**: Human Approval Owner gives sign-off on the final artifact.
7. **Final Output**: The Service Report is locked and finalized.
