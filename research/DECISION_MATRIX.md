# Decision Matrix & Business-Agent Impact Scoring

To prevent framework bloat, every extracted pattern must prove its worth by scoring high on the Business-Agent Impact scale. We do not build features for theoretical use cases.

## The Rule of Three
A pattern can only be proposed to the Chief Architect if it actively solves a roadblock for **at least three distinct Business Agents**.

### Example Impact Score
**Pattern:** *Unstructured Text Extraction Skill (LLM)*
1. **Service Report Agent**: Needs to extract technician notes into JSON. (Score: High)
2. **Email Agent**: Needs to extract client intent into JSON. (Score: High)
3. **Quotation Agent**: Needs to extract RFQ scope into JSON. (Score: High)
*Total Impact: Approved for Architect Review.*

### Example Reject Score
**Pattern:** *Blockchain Smart Contract Interaction Skill*
1. **Service Report Agent**: Unnecessary.
2. **Email Agent**: Unnecessary.
3. **Quotation Agent**: Unnecessary.
*Total Impact: Rejected. Do not draft an ADR.*

## The Matrix
When filling out the Research Package, map the pattern against the Official Roadmap Agents:
- Service Report Agent
- Email Agent
- Quotation Agent
- Inspection Agent
- Bootstrap Agent
- Budget Manager Agent

If you cannot find three agents that require the pattern to function, the pattern is placed in the Concept Backlog and the Research Package is closed.
