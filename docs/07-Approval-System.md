# Approval System

The Approval System acts as the OS Permission System. It is an asynchronous gate that sits between the Agent Processes and the Device Drivers.

## Approval Levels

Every tool and action is categorized into an approval level:

- **Level 1 (Safe / Read)**: No approval required.
  - Examples: `fs.readFile`, `web.search`, reading database schemas.
- **Level 2 (Moderate / Write)**: Requires one-time approval per session or specific scoped approval.
  - Examples: `fs.writeFile` (in local workspace), creating temporary tables.
- **Level 3 (High / Destructive)**: Requires explicit human-in-the-loop approval for *every* invocation.
  - Examples: `fs.delete`, `db.dropTable`, `cloud.deploy`.
- **Level 4 (Critical / External)**: Requires explicit human approval and multi-factor confirmation.
  - Examples: sending emails (`email.send`), modifying production databases, executing financial transactions.

## Flow
When an agent attempts a Level 3 action, the Kernel suspends the process and issues an IPC message to the client UI. The Agent remains asleep until the human explicitly grants or denies the permission, at which point the Kernel resumes the process with the result.
