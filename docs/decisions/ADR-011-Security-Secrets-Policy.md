# ADR 011: Strict Security and Secrets Policy

## Status
Accepted

## Context
AI Agents have a high risk of accidentally exposing secrets in logs (by dumping their context window) or executing destructive actions if tricked by prompt injection.

## Decision
Adopt a strict "Zero Trust" policy for Agent Processes. Agents do not handle raw API keys (they are injected at the Provider level). The Observability layer must scrub logs. Destructive actions (emails, deploys, DB writes) require Level 3 or 4 asynchronous Approval Gates.

## Consequences
- **Positive**: Protects the user's local machine and cloud accounts from runaway agents or malicious inputs.
- **Negative**: Increases friction for fully autonomous operation, as humans must intervene to approve critical tasks.
