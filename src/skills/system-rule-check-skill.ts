import { ISkill, SkillInput, SkillResult } from './types.js';
import { RuleEngine } from '../rules/rule-engine.js';
import { Rule } from '../rules/types.js';

export class SystemRuleCheckSkill implements ISkill {
    public id = 'system.rule_check';
    public name = 'System Rule Check';
    public description = 'Evaluates deterministic rules against facts.';
    public version = '1.0.0';
    public requiredCapabilities = [];

    private engine = new RuleEngine();

    public async execute(input: SkillInput): Promise<SkillResult> {
        try {
            const rules: Rule[] = input.parameters?.rules;
            if (!rules || !Array.isArray(rules)) {
                return {
                    status: 'failed',
                    errors: [{ code: 'INVALID_INPUT', message: 'Missing or invalid rules array in parameters.' }]
                };
            }

            const facts = input.facts || {};
            const result = this.engine.evaluate(rules, facts);

            if (!result.passed) {
                return {
                    status: 'failed',
                    output: result,
                    errors: [{ code: 'RULES_FAILED', message: 'One or more rules failed.' }]
                };
            }

            return {
                status: 'success',
                output: result
            };
        } catch (error: any) {
            return {
                status: 'failed',
                errors: [{ code: 'EXECUTION_ERROR', message: error.message }]
            };
        }
    }
}
