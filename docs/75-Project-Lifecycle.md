# Project Lifecycle

The WE Agent OS governs projects through a strict state machine lifecycle to prevent hallucinated code execution.

## Lifecycle States
1. **DISCOVERY**: Initial intake. The Business Analysis layer is active. Requirements are being analyzed and the Question Engine is iterating with the user.
2. **ANALYSIS**: The Requirement Analyzer is scoring the gathered facts.
3. **READY**: The Definition of Ready (DoR) is met. Project Bootstrap Workflow executes.
4. **EXECUTION**: Source code is being written, tested, and iterated upon by execution workflows.
5. **DELIVERED**: Execution is complete and artifacts are finalized.
