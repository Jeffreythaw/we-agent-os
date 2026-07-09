# QA Checklist
## Service Report Agent

This checklist is utilized by the Verifier role during testing and loop engineering to ensure the Business Agent Pack is functioning flawlessly.

### Input Verification
- [ ] Does the JSON input use the exact keys `projectCode`, `reportCategory`, `client`, `equipment`, `serviceDate`, `referenceNo`, `technicianName`, `workDescription`, `findings`, `recommendations`, `photoCaptions`, `finalOperatingCondition`?
- [ ] Is `projectCode` strictly "HBL"?

### Execution Verification
- [ ] Does running `we-agent service-report generate` produce an output `.md` file?
- [ ] If a required field is missing, does the CLI process exit with an explicit error without writing an output file?

### Output Verification
- [ ] Does the generated Markdown file contain the correct reference number in the header?
- [ ] Are observations and recommendations formatted as explicit sections?
- [ ] Does the Photos section cleanly present the photo captions?
