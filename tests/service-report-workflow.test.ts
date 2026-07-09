import { describe, it, expect } from 'vitest';
import { WorkflowLoader } from '../src/workflows/workflow-loader.js';
import { Kernel } from '../src/kernel/kernel.js';
import path from 'node:path';

describe('HarbourLink Service Report Workflow', () => {
    it('should execute end-to-end and generate a markdown artifact', async () => {
        const kernel = new Kernel();
        await kernel.initialize();

        const loader = new WorkflowLoader();
        const wfPath = path.join(process.cwd(), 'workflows/service-report/harbourlink-routine-service.workflow.json');
        const inputPath = path.join(process.cwd(), 'examples/service-report/harbourlink-routine-service.input.json');

        const input = await loader.load(wfPath, inputPath);
        
        const result = await kernel.executeWorkflow(input);

        expect(result.passed).toBe(true);
        expect(result.artifacts.length).toBe(1);
        
        // HYBRID GOLDEN VALIDATION STRATEGY
        // Do NOT use brittle exact full-file string equality.
        // We use deterministic structural/key-content checks against the expected.html logic.
        // This ensures resilience to minor whitespace/formatting changes while guaranteeing data integrity.
        const artifactContent = result.artifacts[0].content;
        expect(artifactContent).toContain('<!DOCTYPE html>');
        expect(artifactContent).toContain('<h1>HarbourLink Service Report</h1>');
        expect(artifactContent).toContain('SVC/HBL/072026/001'); // Check key facts
        expect(artifactContent).toContain('<p>Filter was clogged. Coils were dirty but intact. No leaks detected.</p>');
        expect(artifactContent).toContain('<p>Recommend replacing belt next quarter.</p>');
        expect(artifactContent).toContain('<h2 class="section-title">Signatures & Acknowledgement</h2>');
        expect(artifactContent).toContain('Prepared By:<br>John Doe');
        expect(artifactContent).toContain('Checked By:<br>Jane Smith');
        expect(artifactContent).toContain('Client Representative:<br>Alice Johnson');
        
        // Ensure no unresolved mustache tokens exist
        expect(artifactContent).not.toContain('{{');
    });
});
