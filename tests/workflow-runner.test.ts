import { describe, it, expect, beforeEach } from 'vitest';
import { WorkflowRunner } from '../src/workflows/workflow-runner.js';
import { WorkflowInput } from '../src/workflows/types.js';
import { SkillRegistry } from '../src/skills/skill-registry.js';
import { SystemRuleCheckSkill } from '../src/skills/system-rule-check-skill.js';
import { SystemChecklistSkill } from '../src/skills/system-checklist-skill.js';
import { SystemTemplateRenderSkill } from '../src/skills/system-template-render-skill.js';

describe('WorkflowRunner', () => {
    let registry: SkillRegistry;
    let runner: WorkflowRunner;

    beforeEach(() => {
        registry = new SkillRegistry();
        registry.register(new SystemRuleCheckSkill());
        registry.register(new SystemChecklistSkill());
        registry.register(new SystemTemplateRenderSkill());
        
        runner = new WorkflowRunner(registry);
    });

    it('should successfully run a multi-step workflow with skills', async () => {
        const input: WorkflowInput = {
            workflowId: 'wf-1',
            workflowName: 'Test Workflow',
            facts: { status: 'active', user: 'bob' },
            variables: { project: { name: 'Apollo' } },
            steps: [
                {
                    id: 's1',
                    skillId: 'system.rule_check',
                    parameters: {
                        rules: [
                            { factKey: 'status', operator: 'equals', expectedValue: 'active', severity: 'error', message: 'Status must be active' }
                        ]
                    }
                },
                {
                    id: 's2',
                    skillId: 'system.checklist_check',
                    parameters: {
                        checklist: {
                            id: 'c1',
                            name: 'Basic Checklist',
                            items: [
                                {
                                    id: 'i1',
                                    label: 'User exists',
                                    required: true,
                                    rule: { factKey: 'user', operator: 'exists', severity: 'error', message: 'User needed' }
                                }
                            ]
                        }
                    }
                },
                {
                    id: 's3',
                    skillId: 'system.template_render',
                    parameters: {
                        template: 'Project {{project.name}} verified.'
                    }
                }
            ]
        };

        const result = await runner.run(input);

        expect(result.passed).toBe(true);
        expect(result.stepResults.length).toBe(3);
        expect(result.artifacts.length).toBe(1);
        expect(result.artifacts[0].content).toBe('Project Apollo verified.');
        expect(result.warnings.length).toBe(0);
        expect(result.errors.length).toBe(0);
    });

    it('should fail the workflow if a skill fails safely', async () => {
        const input: WorkflowInput = {
            workflowId: 'wf-2',
            workflowName: 'Failing Workflow',
            facts: { status: 'inactive' },
            variables: {},
            steps: [
                {
                    id: 's1',
                    skillId: 'system.rule_check',
                    parameters: {
                        rules: [
                            { factKey: 'status', operator: 'equals', expectedValue: 'active', severity: 'error', message: 'Must be active' }
                        ]
                    }
                },
                {
                    id: 's2',
                    skillId: 'system.template_render',
                    parameters: {
                        template: 'This should not render'
                    }
                }
            ]
        };

        const result = await runner.run(input);

        expect(result.passed).toBe(false);
        expect(result.stepResults.length).toBe(1);
        expect(result.artifacts.length).toBe(0);
        expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should collect warnings from template renders', async () => {
        const input: WorkflowInput = {
            workflowId: 'wf-3',
            workflowName: 'Warning Workflow',
            facts: {},
            variables: {},
            steps: [
                {
                    id: 's1',
                    skillId: 'system.template_render',
                    parameters: {
                        template: 'Hello {{missing}}!'
                    }
                }
            ]
        };

        const result = await runner.run(input);

        expect(result.passed).toBe(true);
        expect(result.warnings.length).toBe(1);
        expect(result.warnings[0]).toContain("Missing variable 'missing'");
        expect(result.artifacts[0].content).toBe('Hello !');
    });

    it('should fail safely if skill is missing', async () => {
        const input: WorkflowInput = {
            workflowId: 'wf-4',
            workflowName: 'Missing Skill Workflow',
            facts: {},
            variables: {},
            steps: [
                {
                    id: 's1',
                    skillId: 'unknown_skill',
                    parameters: {}
                }
            ]
        };

        const result = await runner.run(input);

        expect(result.passed).toBe(false);
        expect(result.errors.length).toBe(1);
        expect(result.errors[0].code).toBe('SKILL_NOT_FOUND');
    });
});
