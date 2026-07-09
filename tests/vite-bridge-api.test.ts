import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { spawn, ChildProcess } from 'child_process';

describe('Vite Bridge API Acceptance Test', () => {
    let viteProcess: ChildProcess;
    const port = 5173;

    beforeAll(async () => {
        // Start vite server
        viteProcess = spawn('npm', ['run', 'dev'], { cwd: './web-app', shell: true });
        
        // Wait for server to be ready
        let retries = 10;
        while (retries > 0) {
            try {
                const res = await fetch(`http://localhost:${port}`);
                if (res.ok) break;
            } catch (e) {
                // not ready
            }
            await new Promise(resolve => setTimeout(resolve, 500));
            retries--;
        }
    }, 10000);

    afterAll(() => {
        if (viteProcess) {
            viteProcess.kill();
        }
    });

    it('should successfully generate an HTML report without placeholders', async () => {
        const payload = {
          workflowId: 'wf-hbl-routine-svc',
          facts: {
             referenceNo: 'SVC/HBL/072026/001',
             projectCode: 'HBL',
             reportCategory: 'ROUTINE_CONTRACT_SERVICE',
             client: 'Test Client',
             serviceDate: '2026-07-08',
             technicianName: 'John',
             equipment: 'FCU/AHU',
             workDescription: 'Test Work',
             findings: 'Test Findings',
             recommendations: 'Test Recommendations',
             finalOperatingCondition: 'Test Good',
             photoCaptions: 'Caption 1\nCaption 2',
             preparedBy: 'John',
             checkedBy: 'Jane',
             clientRepresentative: 'Alice',
             clientAcknowledgementDate: '2026-07-08'
          },
          variables: {
             referenceNo: 'SVC/HBL/072026/001',
             projectCode: 'HBL',
             reportCategory: 'ROUTINE_CONTRACT_SERVICE',
             client: 'Test Client',
             serviceDate: '2026-07-08',
             technicianName: 'John',
             equipment: 'FCU/AHU',
             workDescription: 'Test Work',
             findings: 'Test Findings',
             recommendations: 'Test Recommendations',
             finalOperatingCondition: 'Test Good',
             photoCaptions: 'Caption 1\nCaption 2',
             preparedBy: 'John',
             checkedBy: 'Jane',
             clientRepresentative: 'Alice',
             clientAcknowledgementDate: '2026-07-08'
          }
        };

        const res = await fetch(`http://localhost:${port}/api/generate-report`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        expect(res.status).toBe(200);
        const html = await res.text();
        
        // 1. Confirm HTML is returned
        expect(html).toContain('<!DOCTYPE html>');
        
        // 2. Confirm output contains required facts
        expect(html).toContain('SVC/HBL/072026/001');
        expect(html).toContain('Test Recommendations');
        expect(html).toContain('Caption 1');
        expect(html).toContain('Caption 2');
        
        // 3. Confirm signatures block
        expect(html).toContain('Alice');
        expect(html).toContain('Signatures & Acknowledgement');
        
        // 4. Confirm output does NOT contain leaks
        expect(html).not.toContain('{{');
        expect(html).not.toContain('undefined');
        expect(html).not.toContain('null');
        
        // 5. Confirm photoCaptions formatting rules
        expect(html).toContain('Caption 1\nCaption 2');
        expect(html).not.toContain('\\n');
        expect(html).toContain('white-space: pre-line');
    }, 15000);
});
