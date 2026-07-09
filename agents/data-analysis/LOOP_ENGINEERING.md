# Loop Engineering

The Data Analysis Agent follows the strict Loop Engineering Method:

1. **User Feedback**: User reviews the generated Analysis Report.
2. **Verifier Checks**: Verifier Agent checks the feedback against `RULES.md` (e.g., cannot alter the raw data facts).
3. **Planner Correction Plan**: Planner Agent drafts an update to the `summary` or `recommendations`.
4. **Developer Applies Fix**: Developer Agent modifies the JSON and triggers re-render via `WORKFLOW.json`.
5. **Verifier Re-checks**: Verifier Agent confirms the new artifact still passes all `CHECKLISTS.md` items.
6. **Approval Gate**: Human Approval Owner gives sign-off on the final report.
7. **Final Output**: The Analysis Report is locked and finalized.
