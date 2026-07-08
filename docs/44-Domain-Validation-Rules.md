# Domain Validation Rules

## Core Business Logic Rules
1. **Workspace Isolation**: No entity may cross-reference entities in another Workspace without an explicit global bridge policy.
2. **Execution Context**: An Agent cannot exist without an active Execution.
3. **Artifact Immutability**: Historical versions of Artifacts are read-only. Edits create new versions.
4. **Approval Strictness**: A pending Approval blocks the related Task indefinitely until resolved.
5. **Policy Precedence**: Explicit Deny overrides any Allow.
6. **Knowledge Veracity**: Knowledge items must have a content hash to detect drift/tampering.
