import { describe, it, expect } from 'vitest';
import { ConsensusService } from '../src/reasoning/consensus-service.js';
import { ReasoningOutput } from '../src/reasoning/types.js';

describe('ConsensusService', () => {
    it('should compute readiness correctly for flawless outputs', () => {
        const service = new ConsensusService();
        
        const outputs: ReasoningOutput[] = [
            {
                profileId: 'hat_white',
                timestamp: Date.now(),
                insights: ['All data present'],
                missingFacts: [],
                opportunities: [],
                risks: [],
                passedDeterministic: true,
                confidence: 90
            },
            {
                profileId: 'hat_yellow',
                timestamp: Date.now(),
                insights: ['Looks great'],
                missingFacts: [],
                opportunities: ['Can be done fast'],
                risks: [],
                passedDeterministic: true,
                confidence: 90
            }
        ];

        const result = service.evaluate('task-1', outputs);

        expect(result.readyForExecution).toBe(true);
        expect(result.readinessScore).toBe(90);
        expect(result.opportunities.length).toBe(1);
    });

    it('should block execution if unmitigated risks or missing info exist', () => {
        const service = new ConsensusService();
        
        const outputs: ReasoningOutput[] = [
            {
                profileId: 'hat_black',
                timestamp: Date.now(),
                insights: [],
                missingFacts: ['DB size unknown'],
                opportunities: [],
                risks: [{ severity: 'high', description: 'Data loss risk' }], // No mitigation
                passedDeterministic: true,
                confidence: 85
            }
        ];

        const result = service.evaluate('task-2', outputs);

        expect(result.readyForExecution).toBe(false);
        // confidence = 85. missing = -20. risk = -40. readiness = 25
        expect(result.readinessScore).toBeLessThan(80);
        expect(result.missingInformation.length).toBe(1);
        expect(result.risks.length).toBe(1);
    });
});
