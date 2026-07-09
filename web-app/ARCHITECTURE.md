# Web App Architecture

## 1. Vite Development Bridge
The current UI leverages a custom Vite plugin (`cli-plugin` in `vite.config.ts`) to intercept API requests (`/api/generate-report`) and forward them locally to the `we-agent` CLI backend via Node's `child_process`.

### Prerequisites
- You must run `npm run build` from the repository root first.
- The Vite bridge explicitly depends on the compiled `dist/cli/index.js` file existing.

## 2. Status
- **Acceptable for:** Local development and v0.2 Web-first MVP demo.
- **NOT Acceptable for:** Production deployments (v0.3+).

## 3. Limitations (v0.2)
- The Vite bridge uses fixed temporary file names (`temp-input.json`, `temp-output.html`).
- Concurrent report generation is not supported.
- Designed strictly for a single-user local MVP.
- **Security:** `TemplateEngine` currently performs raw string substitution without HTML escaping. Before any network/multi-user deployment, HTML escaping/sanitization must be implemented through an approved ADR/RFC to prevent XSS vulnerabilities.
- v0.3 must replace this with UUID temp files or a production bridge.
## 3. Constraints
Do **not** refactor or expand this bridge without an approved Architectural Decision Record (ADR). Its replacement is formally deferred to the v0.3 Evidence Required / Concept Backlog phase.
