import { describe, it, expect } from 'vitest';
import { SystemRuleCheckSkill } from '../src/skills/system-rule-check-skill.js';
import { SystemChecklistSkill } from '../src/skills/system-checklist-skill.js';
import { SystemTemplateRenderSkill } from '../src/skills/system-template-render-skill.js';
import { SkillInput } from '../src/skills/types.js';

describe('System Skills', () => {
    it('should validate inputs defensively and return failed without throwing', async () => {
        const input: SkillInput = { facts: {}, variables: {}, context: {} };
        
        const ruleSkill = new SystemRuleCheckSkill();
        const r1 = await ruleSkill.execute(input);
        expect(r1.status).toBe('failed');
        expect(r1.errors?.[0].code).toBe('INVALID_INPUT');

        const checkSkill = new SystemChecklistSkill();
        const r2 = await checkSkill.execute(input);
        expect(r2.status).toBe('failed');
        expect(r2.errors?.[0].code).toBe('INVALID_INPUT');

        const tempSkill = new SystemTemplateRenderSkill();
        const r3 = await tempSkill.execute(input);
        expect(r3.status).toBe('failed');
        expect(r3.errors?.[0].code).toBe('INVALID_INPUT');
    });

    it('should successfully run SystemRuleCheckSkill', async () => {
        const skill = new SystemRuleCheckSkill();
        const input: SkillInput = {
            facts: { name: 'alice' },
            variables: {},
            context: {},
            parameters: {
                rules: [
                    { factKey: 'name', operator: 'equals', expectedValue: 'alice', severity: 'error', message: 'Must be alice' }
                ]
            }
        };

        const result = await skill.execute(input);
        expect(result.status).toBe('success');
        expect(result.output.passed).toBe(true);
    });

    it('should fail SystemRuleCheckSkill safely', async () => {
        const skill = new SystemRuleCheckSkill();
        const input: SkillInput = {
            facts: { name: 'bob' },
            variables: {},
            context: {},
            parameters: {
                rules: [
                    { factKey: 'name', operator: 'equals', expectedValue: 'alice', severity: 'error', message: 'Must be alice' }
                ]
            }
        };

        const result = await skill.execute(input);
        expect(result.status).toBe('failed');
        expect(result.errors?.[0].code).toBe('RULES_FAILED');
    });

    it('should successfully run SystemChecklistSkill', async () => {
        const skill = new SystemChecklistSkill();
        const input: SkillInput = {
            facts: { env: 'prod' },
            variables: {},
            context: {},
            parameters: {
                checklist: {
                    id: 'c1',
                    name: 'Env Check',
                    items: [
                        {
                            id: 'i1',
                            label: 'Env Prod',
                            required: true,
                            rule: { factKey: 'env', operator: 'equals', expectedValue: 'prod', severity: 'error', message: 'Must be prod' }
                        }
                    ]
                }
            }
        };

        const result = await skill.execute(input);
        expect(result.status).toBe('success');
        expect(result.output.passed).toBe(true);
    });

    it('should successfully run SystemTemplateRenderSkill and produce artifact', async () => {
        const skill = new SystemTemplateRenderSkill();
        const input: SkillInput = {
            facts: {},
            variables: { name: 'alice' },
            context: {},
            parameters: {
                template: 'Hello {{name}}!'
            }
        };

        const result = await skill.execute(input);
        expect(result.status).toBe('success');
        expect(result.output).toBe('Hello alice!');
        expect(result.artifacts?.length).toBe(1);
        expect(result.artifacts?.[0].content).toBe('Hello alice!');
    });
    
    it('should add warnings when rendering missing variables in template', async () => {
        const skill = new SystemTemplateRenderSkill();
        const input: SkillInput = {
            facts: {},
            variables: {},
            context: {},
            parameters: {
                template: 'Hello {{name}}!'
            }
        };

        const result = await skill.execute(input);
        expect(result.status).toBe('success');
        expect(result.warnings?.length).toBe(1);
        expect(result.artifacts?.[0].content).toBe('Hello !');
    });
});
