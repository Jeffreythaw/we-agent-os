# Concrete Checklists

## Pre-Execution
- [ ] Verify upstream handoff artifact is present.
- [ ] Validate required inputs exist and are well-formed.
- [ ] Confirm no forbidden constraints are currently active.

## Post-Execution
- [ ] Verify output artifact strictly matches the required format.
- [ ] Ensure the approval gate (Are all pre-push concrete checks executed and approved?) is met.

## Mandatory Pre-Push Checks
- [ ] `git status`
- [ ] `git log --oneline -5`
- [ ] `git remote -v`
- [ ] Confirm branch is synced or ahead intentionally
- [ ] Push ONLY after explicit approval
