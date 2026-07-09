# Service Report Golden Output Archive

This directory contains the legacy Markdown golden output (`harbourlink-routine-service.expected.md`).

As of v0.2, the WE Agent OS output standard for Service Reports has been migrated to **HTML**. The new golden output reference is `harbourlink-routine-service.expected.html` located in the parent directory.

The old Markdown files are kept here solely for historical reference. Tests now use a hybrid validation strategy against the HTML output (checking deterministic structured content rather than brittle full-file string equality).
