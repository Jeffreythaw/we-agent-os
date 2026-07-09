import { describe, it, expect } from 'vitest';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import fs from 'node:fs/promises';

const execAsync = promisify(exec);

describe('HarbourLink Service Report CLI Output File', () => {
    it('should write artifact to file when --output is provided on success', async () => {
        const cliPath = path.join(process.cwd(), 'dist/cli/index.js');
        const wfPath = path.join(process.cwd(), 'workflows/service-report/harbourlink-routine-service.workflow.json');
        const inputPath = path.join(process.cwd(), 'examples/service-report/harbourlink-routine-service.input.json');
        const outputPath = path.join(process.cwd(), 'output/test-harbourlink-report.md');
        
        // Clean up before test
        try {
            await fs.unlink(outputPath);
        } catch (e) {
            // ignore if not exists
        }

        const cmd = `node "${cliPath}" workflow run "${wfPath}" --input "${inputPath}" --output "${outputPath}"`;
        
        const { stdout } = await execAsync(cmd);
        
        expect(stdout).toContain('Artifact saved to');
        
        // Check file exists and content is correct
        const fileContent = await fs.readFile(outputPath, 'utf-8');
        expect(fileContent).toContain('<h1>HarbourLink Service Report</h1>');
        expect(fileContent).toContain('Signatures & Acknowledgement');
        expect(fileContent).toContain('Alice Johnson');
        expect(fileContent).not.toContain('{{');
    });
});
