# Workflow Composer

## 1. Concept
The Workflow Composer takes individual, atomic Skills and links them into complex execution graphs (Workflows). 

## 2. Composition
- Workflows compose Skills into sequential, parallel, or conditional paths.
- E.g., A "Deploy Feature" workflow might compose the following skills: `Run Tests` -> `Build Project` -> `Deploy to Vercel`.

## 3. Execution
- Workflows are interpreted by the OS and fed into the Planner.
- Unlike Phase 1 which supported only single linear agent loops, v2 Workflows enable sophisticated multi-step, multi-agent orchestration.
