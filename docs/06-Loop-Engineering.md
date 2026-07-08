# Loop Engineering

Loop Engineering is the core execution philosophy of WE Agent OS. Instead of linear "fire-and-forget" prompting, agents operate in a continuous, monitored execution loop managed by the Kernel's Feedback Controller.

## The Loop Flow

1. **Plan**: The agent receives a task and generates a step-by-step strategy. This plan is logged and, if required, sent to the Approval Gate.
2. **Execute**: The agent attempts the first step, interacting with Device Drivers (Tools/MCP).
3. **Check**: The agent evaluates the output of the execution against its expected result.
4. **Improve**: If the execution failed or the result was unexpected, the agent analyzes the failure and modifies its approach.
5. **Retry**: The agent re-attempts the step with the improved approach (up to a configured retry limit).
6. **Verify**: Once the step succeeds, the agent verifies the system state is correct before moving to the next step in the Plan.
7. **Final**: The overall task is marked complete, and a final summary is produced and emitted via IPC.

## Resilience
By embedding validation (Check/Verify) directly into the execution loop, the framework prevents hallucinations from compounding. Errors are caught early and self-corrected.
