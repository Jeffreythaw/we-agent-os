import fs from 'node:fs/promises';
import { WorkflowInput } from './types.js';

export class WorkflowLoader {
    public async load(workflowPath: string, inputPath?: string): Promise<WorkflowInput> {
        const wfRaw = await fs.readFile(workflowPath, 'utf-8');
        const wf: WorkflowInput = JSON.parse(wfRaw);

        if (inputPath) {
            const inputRaw = await fs.readFile(inputPath, 'utf-8');
            const inputData = JSON.parse(inputRaw);
            
            if (inputData.facts) {
                wf.facts = { ...wf.facts, ...inputData.facts };
            }
            if (inputData.variables) {
                wf.variables = { ...wf.variables, ...inputData.variables };
            }
        }

        return wf;
    }
}
