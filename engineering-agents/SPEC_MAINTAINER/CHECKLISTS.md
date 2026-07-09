# Concrete Checklists

## Pre-Execution
- [ ] Verify upstream handoff artifact is present.
- [ ] Validate required inputs exist and are well-formed.
- [ ] Confirm no forbidden constraints are currently active.

## Post-Execution
- [ ] Verify output artifact strictly matches the required format.
- [ ] Ensure the approval gate (Is the specification drift fully documented and conflict-free?) is met.

## Spec Update Rules
- [ ] Update `SPEC_CHANGE_LOG.md` whenever any context changes.
- [ ] Mandate an RFC if the change requires modifying the frozen `src/` core.
