# Advanced Skills

## spec impact analysis
- **When to use:** When a new requirement is proposed
- **Required inputs:** New requirement
- **Output format:** List of affected context files
- **Failure conditions:** If impact spans frozen core

## ADR consistency check
- **When to use:** When drafting a new ADR
- **Required inputs:** Draft ADR
- **Output format:** Conflict report against existing ADRs
- **Failure conditions:** If ADR contradicts a standing un-deprecated ADR

## RFC requirement detection
- **When to use:** When a change touches src/
- **Required inputs:** Proposed change
- **Output format:** RFC mandate alert
- **Failure conditions:** N/A

## spec change log maintenance
- **When to use:** When context is modified
- **Required inputs:** Context diff
- **Output format:** SPEC_CHANGE_LOG.md entry
- **Failure conditions:** If diff is empty

