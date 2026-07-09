# Web App Architecture

## 1. Vite Development Bridge
The current UI leverages a custom Vite plugin (`cli-plugin` in `vite.config.ts`) to intercept API requests (`/api/generate-report`) and forward them locally to the `we-agent` CLI backend via Node's `child_process`.

## 2. Status
- **Acceptable for:** Local development and v0.2 Web-first MVP demo.
- **NOT Acceptable for:** Production deployments (v0.3+).

## 3. Constraints
Do **not** refactor or expand this bridge without an approved Architectural Decision Record (ADR). Its replacement is formally deferred to the v0.3 Evidence Required / Concept Backlog phase.
