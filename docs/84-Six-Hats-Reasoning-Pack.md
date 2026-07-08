# Six Hats Reasoning Pack

This document outlines how De Bono's Six Thinking Hats methodology is mapped into a standard JSON Knowledge Pack.

## Pack Definition
- **ID**: `we.reasoning.six_hats`
- **Profiles**:
  1. **White Hat (Facts)**: Analyzes available data, identifies missing facts. (Heavy reliance on Deterministic Rules).
  2. **Red Hat (Emotion/Intuition)**: Evaluates user sentiment, friction, and aesthetic impact. (LLM Escalated).
  3. **Black Hat (Risks)**: Strict evaluation of security, failure modes, and edge cases. (Hybrid Checklist + LLM).
  4. **Yellow Hat (Benefits)**: Identifies optimizations, value additions, and performance gains.
  5. **Green Hat (Creativity)**: Proposes alternative architectures and novel solutions.
  6. **Blue Hat (Control)**: Meta-profile. Often handled intrinsically by the OS Consensus Service to summarize and organize the other hats.

## Execution
The Reasoning Engine executes these 6 profiles either in parallel (for independent hats like White/Black/Yellow) or sequentially (feeding Yellow/Green into Black for risk-checking), depending on the workflow definition.
