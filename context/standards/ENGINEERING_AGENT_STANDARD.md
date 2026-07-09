# Engineering Agent Standard

## Engineering Agent Pack Structure
Each Engineering Agent Pack resides in `engineering-agents/<AGENT_NAME>/` and must contain exactly 7 standardized files.

## Required Files
1. **AGENT.md**: Core definition (purpose, responsibilities, allowed/forbidden actions).
2. **SKILLS.md**: Advanced deterministic skills assigned to the agent.
3. **CHECKLISTS.md**: Quality checklists and approval gates.
4. **HANDOFF.md**: Handoff protocols and escalation triggers.
5. **LIMITATIONS.md**: Strict constraints and fallback rules.
6. **TEST_PLAN.md**: How this agent's outputs are verified.
7. **EXAMPLES.md**: Golden examples of the agent's work.

## Skill Definition Format
Skills must be defined as declarative capabilities mapping to a specific operational task.

## Checklist Format
Checklists must be structured as pre-execution validation and post-execution approval gates.

## Handoff Protocol
Agents must formally document which downstream agent receives their output.

## Approval Gates
Every agent must define a set of criteria that, if failed, halts the pipeline and hands work back to the previous agent.

## Local-Agent-First Rule
Agents must rely on local deterministic workflows.

## External AI Fallback Rule
External AI is strictly an advisor of last resort.
## Skill Metadata & Versioning Standard
Every skill defined in a `SKILLS.md` file must include the following metadata block:
- **id**: Unique identifier string
- **name**: Human-readable name
- **version**: SemVer string
- **status**: active/deprecated/draft
- **owner_agent**: Agent responsible for this skill
- **last_updated**: ISO Date
- **inputs**: Required inputs
- **outputs**: Expected outputs
- **failure_conditions**: Conditions that abort the skill
