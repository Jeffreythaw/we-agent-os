import { ReasoningOutput, ConsensusOutput, RiskItem } from './types.js';

export class ConsensusService {
    public evaluate(taskId: string, outputs: ReasoningOutput[]): ConsensusOutput {
        const missingInformation: string[] = [];
        const risks: RiskItem[] = [];
        const opportunities: string[] = [];
        const clarificationQuestions: string[] = [];
        let totalConfidence = 0;

        for (const out of outputs) {
            if (out.missingFacts && Array.isArray(out.missingFacts)) {
                missingInformation.push(...out.missingFacts);
            }
            if (out.risks && Array.isArray(out.risks)) {
                risks.push(...out.risks);
            }
            if (out.opportunities && Array.isArray(out.opportunities)) {
                opportunities.push(...out.opportunities);
            }
            if (out.clarificationQuestions && Array.isArray(out.clarificationQuestions)) {
                clarificationQuestions.push(...out.clarificationQuestions);
            }
            totalConfidence += out.confidence || 0;
        }

        const avgConfidence = outputs.length > 0 ? totalConfidence / outputs.length : 0;
        const confidenceScore = Math.round(avgConfidence);

        // STUB: For MVP, conflicts and agreements are mocked arrays or derived minimally.
        const conflicts: string[] = [];
        
        const unmitigatedRisks = risks.filter(r => !r.mitigationProposed);
        
        let readinessScore = confidenceScore;
        if (missingInformation.length > 0) readinessScore -= 20;
        if (unmitigatedRisks.length > 0) readinessScore -= 40;
        if (conflicts.length > 0) readinessScore -= 10;
        
        readinessScore = Math.max(0, readinessScore);

        const readyForExecution = 
            unmitigatedRisks.length === 0 && 
            conflicts.length === 0 && 
            missingInformation.length === 0 && 
            readinessScore >= 80;

        return {
            taskId,
            agreements: [],
            conflicts,
            missingInformation,
            risks,
            opportunities,
            clarificationQuestions,
            confidenceScore,
            readinessScore,
            readyForExecution
        };
    }
}
