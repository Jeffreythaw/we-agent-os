# Reasoning Output Schema

To allow the Consensus Service to function deterministically across ANY reasoning framework (Six Hats, SWOT, etc.), all Reasoning Profiles MUST conform their outputs to a universal JSON schema.

## Core Schema (`ReasoningOutput`)

```typescript
interface ReasoningOutput {
  profileId: string;           // e.g., 'hat_black' or 'swot_weakness'
  timestamp: number;
  
  // Standardized analytical dimensions
  insights: string[];          // Core findings related to the profile's focus
  risks: RiskItem[];           // Potential failure modes identified
  opportunities: string[];     // Potential optimizations identified
  missingFacts: string[];      // Data required but not present in context
  
  // Gating metrics
  passedDeterministic: boolean;// Did the checklist/rules pass?
  confidence: number;          // 0-100 scale of analytical certainty
}

interface RiskItem {
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  mitigationProposed?: string;
}
```

## Benefit
By forcing a "Creative Green Hat" and a "Pessimistic Black Hat" to both populate `risks` and `opportunities` arrays, the Consensus Service can run standard array intersections and rule evaluations without needing an LLM to "read" long paragraphs of debate text.
