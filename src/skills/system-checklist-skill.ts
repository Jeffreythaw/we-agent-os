import { ISkill, SkillInput, SkillResult } from './types.js';
import { ChecklistEngine } from '../checklists/checklist-engine.js';
import { Checklist } from '../checklists/types.js';

export class SystemChecklistSkill implements ISkill {
    public id = 'system.checklist_check';
    public name = 'System Checklist Check';
    public description = 'Evaluates a checklist against facts.';
    public version = '1.0.0';
    public requiredCapabilities = [];

    private engine = new ChecklistEngine();

    public async execute(input: SkillInput): Promise<SkillResult> {
        try {
            const checklist: Checklist = input.parameters?.checklist;
            if (!checklist || !checklist.items || !Array.isArray(checklist.items)) {
                return {
                    status: 'failed',
                    errors: [{ code: 'INVALID_INPUT', message: 'Missing or invalid checklist in parameters.' }]
                };
            }

            const facts = input.facts || {};
            const result = this.engine.evaluate(checklist, facts);

            if (!result.passed) {
                return {
                    status: 'failed',
                    output: result,
                    errors: [{ code: 'CHECKLIST_FAILED', message: 'Checklist failed.' }]
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
