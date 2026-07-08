# Policy Engine

## 1. Purpose
The Policy Engine is the strict enforcement arm of the Approval System. It evaluates whether a requested action by an agent is allowed, blocked, or requires explicit human approval based on predefined security rules.

## 2. Responsibilities
- Evaluate incoming tool execution requests against security policies.
- Match request arguments against regex or scoped rules (e.g., "allow write only in `/tmp/`").
- Trigger asynchronous approval flows for Level 3 and 4 actions.
- Deny explicitly blocked actions immediately.

## 3. Inputs and Outputs
- **Inputs**: Agent context, tool name, tool arguments, current global policy rules.
- **Outputs**: Policy Decision (`ALLOW`, `DENY`, or `REQUIRE_APPROVAL`).

## 4. Core Concepts
- **Policy Definition**: Rules defining what is allowed or denied (e.g., RBAC or ABAC).
- **Scope Restriction**: Limiting a tool's capabilities (e.g., restricting `git.commit` to a specific repository).
- **Intervention Gate**: The point at which the Policy Engine suspends the agent to ask the human.

## 5. Interfaces/Contracts at High Level
- `evaluateRequest(agentId: string, tool: string, args: object): PolicyDecision`
- `loadPolicies(policies: PolicyDocument[]): void`
- `updateSessionPolicy(agentId: string, grant: ScopeGrant): void`

## 6. Failure Handling
- Fail Closed: If the Policy Engine encounters a malformed rule or an unknown tool, it defaults to `DENY` or `REQUIRE_APPROVAL`.
- Automatically expires session-level approvals after a timeout.

## 7. Best Practices
- Treat security policies as code (store them in version-controlled YAML files).
- Keep policy evaluation extremely fast, as it runs synchronously on every tool call.

## 8. Risks and Anti-patterns
- **Anti-pattern**: Relying on the LLM to self-police its own actions (the LLM cannot be the security boundary).
- **Risk**: Overly complex policies causing legitimate agent workflows to freeze constantly, leading to user alert fatigue.

## 9. Relationship with other WE Agent OS Components
- Acts as the synchronous enforcement mechanism for the **Approval System**.
- Instructs the **State Machine** to suspend agents requiring approval.
- Intercepts calls from the agent before they reach the **Tool/MCP System**.
