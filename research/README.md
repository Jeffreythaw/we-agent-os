# WE Agent OS Research Library

## Purpose
The Research Library is the formal repository for evaluating, dissecting, and extracting architectural patterns from external codebases and frameworks. Because WE Agent OS enforces a strict "Workflow-First, Skill-First, AI-Optional" paradigm, we do not blindly copy code from external repositories. Instead, we use this library to formally analyze external solutions, extract valuable patterns, and translate them into decoupled Knowledge Packs or independent Business Agents.

## The Research Workflow
1. **Target Identification**: A repository or framework is identified as potentially valuable.
2. **Evaluation**: The target is graded against the `REPOSITORY_EVALUATION_CRITERIA.md`.
3. **License Review**: The target is cleared via the `LICENSE_REVIEW_GUIDE.md`.
4. **Pattern Extraction**: Relevant capabilities are isolated and mapped using the `PATTERN_EXTRACTION_GUIDE.md`.
5. **Business-Agent Impact Scoring**: The extracted patterns are scored in the `DECISION_MATRIX.md` to prove they actively benefit at least three distinct Business Agents.
6. **Architect Approval Gate**: The Chief Architect reviews the Research Package. If approved, an ADR is generated to schedule implementation.

## Required Artifacts
Every research initiative must produce a completed `RESEARCH_PACKAGE_TEMPLATE.md` within its own sub-directory. 

## Adoption vs Reject Workflows
- **Adoption Workflow**: If the Architect approves the package, the pattern is queued for implementation as a standalone decoupled Skill, Knowledge Pack, or Business Agent.
- **Reject Workflow**: If the package violates the constitution (e.g., requires hardcoding domain logic into the kernel, violates licensing, or lacks Business Agent evidence), the Research Package is marked `[REJECTED]` and archived for historical context. No implementation occurs.
