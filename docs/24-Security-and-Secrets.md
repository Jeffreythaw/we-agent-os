# Security and Secrets

WE Agent OS operates with elevated privileges on the user's machine. Security and secret management are paramount.

## Rules for Secrets

1. **No Hardcoded Secrets**: API keys, database credentials, and tokens must NEVER be hardcoded in TypeScript files, Agent Manifests, or skill files.
2. **Environment Variables (.env)**: All secrets must be loaded exclusively via standard environment variables.
3. **No Secret Bleed in Logs**: The Observability system must actively scrub logs and Event Bus payloads for known secret patterns (e.g., `sk-...` for OpenAI).

## Required Approval Levels

The Approval System enforces the following default gates for sensitive capabilities:

- **API Keys / LLM Tokens**: Handled by the Provider Router internally. Agents never see the raw tokens.
- **Database Credentials**: Require Level 3 (Action-by-Action) approval before a connection string is initialized.
- **Gmail / Email Tools**: Sending an email is unconditionally a **Level 4 (Critical)** action. Reading an email is Level 2.
- **Google Drive / File Sync**: Destructive syncs or bulk deletions require Level 3 approval.
- **GitHub / Source Control**: `git push` or merging PRs requires Level 3 approval.
- **Deployment Tools**: Using Vercel, AWS, or Terraform CLIs to mutate cloud infrastructure is a **Level 4 (Critical)** action.
