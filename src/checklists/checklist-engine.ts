import { Checklist, ChecklistEvaluationResult, ChecklistItemResult } from './types.js';
import { RuleEngine } from '../rules/rule-engine.js';

export class ChecklistEngine {
    private ruleEngine: RuleEngine;

    constructor() {
        this.ruleEngine = new RuleEngine();
    }

    public evaluate(checklist: Checklist, facts: Record<string, any>): ChecklistEvaluationResult {
        const itemResults: ChecklistItemResult[] = [];
        let requiredFailedCount = 0;
        let optionalFailedCount = 0;
        let warningCount = 0;
        let errorCount = 0;

        for (const item of checklist.items) {
            const ruleEval = this.ruleEngine.evaluate([item.rule], facts);
            const ruleResult = ruleEval.results[0];
            const passed = ruleResult.passed;

            itemResults.push({
                item,
                passed,
                ruleResult
            });

            if (!passed) {
                if (item.rule.severity === 'error') {
                    errorCount++;
                } else if (item.rule.severity === 'warning') {
                    warningCount++;
                }

                if (item.required) {
                    requiredFailedCount++;
                } else {
                    optionalFailedCount++;
                }
            }
        }

        const checklistPassed = requiredFailedCount === 0 && errorCount === 0;

        return {
            checklistId: checklist.id,
            checklistName: checklist.name,
            passed: checklistPassed,
            itemResults,
            requiredFailedCount,
            optionalFailedCount,
            warningCount,
            errorCount
        };
    }
}
