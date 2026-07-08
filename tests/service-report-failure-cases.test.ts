import { describe, it, expect } from 'vitest';
import { WorkflowLoader } from '../src/workflows/workflow-loader.js';
import { Kernel } from '../src/kernel/kernel.js';
import path from 'node:path';

describe('HarbourLink Service Report Workflow - Failure Cases', () => {
    it('should fail when referenceNumber is missing', async () => {
        const kernel = new Kernel();
        await kernel.initialize();
        const loader = new WorkflowLoader();
        const wfPath = path.join(process.cwd(), 'workflows/service-report/harbourlink-routine-service.workflow.json');
        const inputPath = path.join(process.cwd(), 'examples/service-report/fail-missing-reference.input.json');

        const input = await loader.load(wfPath, inputPath);
        const result = await kernel.executeWorkflow(input);

        expect(result.passed).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
        expect(result.artifacts.length).toBe(0);
    });

    it('should fail when a photo caption is missing', async () => {
        const kernel = new Kernel();
        await kernel.initialize();
        const loader = new WorkflowLoader();
        const wfPath = path.join(process.cwd(), 'workflows/service-report/harbourlink-routine-service.workflow.json');
        const inputPath = path.join(process.cwd(), 'examples/service-report/fail-missing-photo-caption.input.json');

        const input = await loader.load(wfPath, inputPath);
        const result = await kernel.executeWorkflow(input);

        expect(result.passed).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
        expect(result.artifacts.length).toBe(0);
    });

    it('should fail when projectCode is wrong', async () => {
        const kernel = new Kernel();
        await kernel.initialize();
        const loader = new WorkflowLoader();
        const wfPath = path.join(process.cwd(), 'workflows/service-report/harbourlink-routine-service.workflow.json');
        const inputPath = path.join(process.cwd(), 'examples/service-report/fail-wrong-project.input.json');

        const input = await loader.load(wfPath, inputPath);
        const result = await kernel.executeWorkflow(input);

        expect(result.passed).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
        expect(result.artifacts.length).toBe(0);
    });
});
