import { describe, it, expect } from 'vitest';
import { Kernel } from '../src/kernel/kernel.js';
import { WorkflowInput } from '../src/workflows/types.js';

describe('Kernel Workflow Integration', () => {
    it('should initialize and execute a workflow with system skills', async () => {
        const kernel = new Kernel();
        await kernel.initialize();

        const input: WorkflowInput = {
            workflowId: 'wf-sys-1',
            workflowName: 'Test Sys Workflow',
            facts: { status: 'active' },
            variables: { name: 'Alice' },
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
                        template: 'Verified {{name}}'
                    }
                }
            ]
        };

        const result = await kernel.executeWorkflow(input);

        expect(result.passed).toBe(true);
        expect(result.artifacts.length).toBe(1);
        expect(result.artifacts[0].content).toBe('Verified Alice');
    });
});
