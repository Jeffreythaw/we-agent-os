import { ReasoningPackLoader } from './reasoning-pack-loader.js';
import { ConsensusService } from './consensus-service.js';
import { RuleEngine } from '../rules/rule-engine.js';
import { ReasoningOutput, ConsensusOutput, ReasoningPack } from './types.js';

export class ReasoningEngine {
    private packLoader: ReasoningPackLoader;
    private consensusService: ConsensusService;
    private ruleEngine: RuleEngine;

    constructor() {
        this.packLoader = new ReasoningPackLoader();
        this.consensusService = new ConsensusService();
        this.ruleEngine = new RuleEngine();
    }

    public async run(packPath: string, taskId: string, contextFacts: Record<string, any>): Promise<ConsensusOutput> {
        const pack: ReasoningPack = await this.packLoader.load(packPath);
        const outputs: ReasoningOutput[] = [];

        for (const profile of pack.profiles) {
            const missingFacts: string[] = [];
            const risks: any[] = [];
            const clarificationQuestions: string[] = [];
            const insights: string[] = [];
            const opportunities: string[] = [];
            let passedDeterministic = true;
            let confidence = 100;

            if (profile.deterministicChecks && profile.deterministicChecks.length > 0) {
                const evalResult = this.ruleEngine.evaluate(profile.deterministicChecks, contextFacts);
                for (const r of evalResult.results) {
                    const rule = r.rule;
                    if (!r.passed) {
                        passedDeterministic = false;
                        confidence -= (100 / profile.deterministicChecks.length);

                        if (profile.id === 'hat_white') {
                            missingFacts.push(rule.message || `Missing fact: ${rule.factKey}`);
                        } else if (profile.id === 'hat_black') {
                            risks.push({
                                severity: rule.severity === 'error' ? 'high' : 'medium',
                                description: rule.message || `Risk condition: ${rule.factKey}`
                            });
                        } else if (profile.id === 'hat_blue') {
                            clarificationQuestions.push(rule.message || `Clarification needed for: ${rule.factKey}`);
                        } else if (profile.id === 'hat_yellow' || profile.id === 'hat_green' || profile.id === 'hat_red') {
                            opportunities.push(`Warning: ${rule.message || rule.factKey}`);
                        } else {
                            insights.push(rule.message || `Failed check: ${rule.factKey}`);
                        }
                    } else {
                        insights.push(`Passed: ${rule.factKey}`);
                    }
                }
            } else {
                insights.push(`No deterministic checks defined for ${profile.name}. LLM execution skipped in MVP.`);
            }

            outputs.push({
                profileId: profile.id,
                timestamp: Date.now(),
                insights,
                risks,
                opportunities,
                missingFacts,
                passedDeterministic,
                confidence: Math.max(0, Math.round(confidence)),
                clarificationQuestions
            });
        }

        return this.consensusService.evaluate(taskId, outputs);
    }
}
