---
id: 0005-html-output
type: architecture_decision_record
title: HTML Output
status: active
version: 1.0.0
last_updated: 2026-07-09
---

# ADR 0005: HTML Output

## Context
Generating PDFs server-side requires heavy binaries (e.g., Puppeteer, PDFKit) which violates the lightweight nature of the OS core and significantly inflates dependency size.

## Decision
HTML is the official Service Report golden output standard. 

The old Markdown golden output is archived. We will not use Markdown as the final presentation layer for customer-facing reports.

## Consequences
The OS core remains dependency-light. The Web UI is solely responsible for rendering the HTML and must ensure print-friendly CSS. 

## Enforcement
Any proposal to add server-side PDF generation tools must be rejected at the OS Kernel level. 

## Deferred Items
Production PDF/export architecture (server-side generation) is formally deferred to v0.3 / Evidence Required. For the v0.2 MVP, browser print/export (`window.print()`) is perfectly acceptable.
