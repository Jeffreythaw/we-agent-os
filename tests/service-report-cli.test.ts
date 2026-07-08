import { describe, it, expect } from 'vitest';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import fs from 'node:fs/promises';

const execAsync = promisify(exec);

describe('Service Report CLI Command', () => {
    it('should generate a service report when given valid input', async () => {
        const cliPath = path.join(process.cwd(), 'dist/cli/index.js');
        const inputPath = path.join(process.cwd(), 'examples/service-report/harbourlink-routine-service.input.json');
        const outputPath = path.join(process.cwd(), 'output/test-service-report-agent.md');
        
        try {
            await fs.unlink(outputPath);
        } catch (e) {
            // ignore
        }

        const cmd = `node "${cliPath}" service-report generate --input "${inputPath}" --output "${outputPath}"`;
        
        const { stdout } = await execAsync(cmd);
        
        expect(stdout).toContain('Success! Service report saved to');
        
        const fileContent = await fs.readFile(outputPath, 'utf-8');
        expect(fileContent).toContain('# HarbourLink Service Report');
    });

    it('should fail and not write file when input is invalid', async () => {
        const cliPath = path.join(process.cwd(), 'dist/cli/index.js');
        const inputPath = path.join(process.cwd(), 'examples/service-report/fail-missing-reference.input.json');
        const outputPath = path.join(process.cwd(), 'output/test-service-report-agent-fail.md');
        
        try {
            await fs.unlink(outputPath);
        } catch (e) {
            // ignore
        }

        const cmd = `node "${cliPath}" service-report generate --input "${inputPath}" --output "${outputPath}"`;
        
        let threw = false;
        try {
            await execAsync(cmd);
        } catch (error: any) {
            threw = true;
            expect(error.stderr).toContain('WORKFLOW FAILED');
        }
        
        expect(threw).toBe(true);
        
        let fileExists = true;
        try {
            await fs.access(outputPath);
        } catch (e) {
            fileExists = false;
        }
        expect(fileExists).toBe(false);
    });
});
