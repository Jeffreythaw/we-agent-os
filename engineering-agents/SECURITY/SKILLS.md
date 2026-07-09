# Advanced Skills

## XSS/security review
- **When to use:** During code review phase
- **Required inputs:** UI code, TemplateEngine
- **Output format:** XSS vulnerability report
- **Failure conditions:** If raw HTML substitution is detected in production scope

## secrets check
- **When to use:** Before commit
- **Required inputs:** git diff
- **Output format:** Secrets leak report
- **Failure conditions:** If API keys or passwords found

## dependency risk review
- **When to use:** When package.json changes
- **Required inputs:** Dependencies
- **Output format:** CVE report
- **Failure conditions:** If critical CVEs exist

## local-only vs production risk assessment
- **When to use:** When reviewing architecture
- **Required inputs:** Context rules
- **Output format:** Risk matrix
- **Failure conditions:** If a local-only shortcut is deployed to production

