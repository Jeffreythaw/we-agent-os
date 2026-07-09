# License Review Guide

Before any pattern, concept, or code snippet is evaluated for integration into WE Agent OS, its source repository must pass a strict license review.

## 1. Approved Licenses (Green Light)
Repositories under these licenses can be studied and their patterns extracted freely:
- **MIT License**
- **Apache License 2.0**
- **BSD 2-Clause / 3-Clause**

## 2. Blocked Licenses (Red Light)
Repositories under these licenses **must not** be used for pattern extraction to prevent viral open-source contamination of the enterprise WE Agent OS:
- **GPL (v2, v3)**
- **AGPL**
- Any proprietary or undisclosed licenses.

## 3. Workflow for License Review
1. Locate the `LICENSE` or `LICENSE.md` file in the root of the target repository.
2. Verify the exact license type.
3. If the license is missing or unclear, mark the Research Package as `[BLOCKED]` immediately.
4. Document the license type in the `RESEARCH_PACKAGE_TEMPLATE.md`.
