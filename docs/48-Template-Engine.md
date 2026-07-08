# Template Engine

## 1. Concept
The Template Engine handles generation of standard artifacts (emails, reports, code scaffolding) without wasting LLM tokens on boilerplate.

## 2. Responsibilities
- Merge context variables into predefined templates (e.g., Handlebars, EJS, or simple string interpolation).
- Generate deterministic outputs for standard operating procedures.

## 3. Fallback
If a template requires "creative" fill-in (e.g., "write a polite introductory paragraph based on this user's profile"), only that specific block is escalated to the Provider Engine.
