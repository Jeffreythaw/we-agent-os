import { Rule, RuleEvaluationResult, RuleResult } from './types.js';

export class RuleEngine {
    public evaluate(rules: Rule[], facts: Record<string, any>): RuleEvaluationResult {
        const results: RuleResult[] = [];
        let errorCount = 0;
        let warningCount = 0;
        let infoCount = 0;

        for (const rule of rules) {
            const actualValue = facts[rule.factKey];
            const passed = this.evaluateRule(rule, actualValue);

            results.push({
                rule,
                passed,
                actualValue
            });

            if (!passed) {
                if (rule.severity === 'error') {
                    errorCount++;
                } else if (rule.severity === 'warning') {
                    warningCount++;
                } else if (rule.severity === 'info') {
                    infoCount++;
                }
            }
        }

        return {
            passed: errorCount === 0,
            results,
            failedCount: errorCount + warningCount + infoCount,
            warningCount,
            errorCount
        };
    }

    private evaluateRule(rule: Rule, actualValue: any): boolean {
        switch (rule.operator) {
            case 'exists':
                return actualValue !== undefined && actualValue !== null;
            case 'missing':
                return actualValue === undefined || actualValue === null;
            case 'equals':
                return actualValue === rule.expectedValue;
            case 'not_equals':
                return actualValue !== rule.expectedValue;
            case 'contains':
                if (typeof actualValue === 'string' || Array.isArray(actualValue)) {
                    return actualValue.includes(rule.expectedValue);
                }
                return false;
            case 'not_contains':
                if (typeof actualValue === 'string' || Array.isArray(actualValue)) {
                    return !actualValue.includes(rule.expectedValue);
                }
                return true;
            case 'regex':
                if (typeof actualValue === 'string' && typeof rule.expectedValue === 'string') {
                    try {
                        const regex = new RegExp(rule.expectedValue);
                        return regex.test(actualValue);
                    } catch (e) {
                        return false;
                    }
                }
                return false;
            default:
                return false;
        }
    }
}
