# Development Rules for AI Coding Agents

When developing or extending the WE Agent OS using an AI Coding Agent, the following strict rules must be observed at all times:

1. **Inspect before editing**: Do not blindly rewrite files. Always read the current state of a file, understand its context, and use focused edit tools rather than overwriting the entire file unless absolutely necessary.
2. **No file deletion without approval**: Do not delete source code files, configuration files, or logs without explicitly prompting the human user for permission.
3. **No overwrite without backup**: When making significant architectural changes to core Kernel or Provider files, ensure the old approach is backed up or version-controlled.
4. **No deploy without approval**: Do not execute `npm publish`, `git push`, or any deployment scripts without explicit human consent.
5. **No email send without approval**: Do not implement tests or scripts that send real emails to live addresses. Mock these interfaces.
6. **No database write without approval**: Do not modify production or staging databases. Use local SQLite or in-memory mocks for testing.
7. **No paid model escalation without approval**: Do not change the default provider from a local model (Ollama) to a paid model (OpenAI) in the configuration without human approval.
8. **Stop after each phase and summarize**: Development must be iterative. At the end of every logical phase, stop executing tools, present a summary of changes and decisions, and wait for human review before proceeding.
