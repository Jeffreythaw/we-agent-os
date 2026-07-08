# Discovery Engine

## Purpose
The Discovery Engine initiates the Business Analysis (BA) Phase. It serves as the intake funnel for raw, unstructured user intent. 

## Responsibilities
1. **Intake Processing**: Accepts natural language project requests.
2. **Entity Extraction**: Uses (if allowed by policy) a Provider to extract initial structured `facts` from the raw prompt.
3. **Context Initialization**: Seeds the Project state in memory, preparing it for the Requirement Analyzer.

## Workflow Integration
The Discovery Engine does not execute code or scaffold files. Its sole output is a set of raw, unverified facts that are passed downstream to the Requirement Analyzer.
