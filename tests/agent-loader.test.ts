import { describe, it, expect } from 'vitest';
import * as path from 'node:path';
import { loadAgent } from '../src/agents/loader.js';

describe('Agent Loader', () => {
    it('should load manifest and prompt from directory', async () => {
        const agentDir = path.join(process.cwd(), 'agents', 'example');
        const loaded = await loadAgent(agentDir);

        expect(loaded.manifest.name).toBe('example-agent');
        expect(loaded.manifest.tools).toContain('fs.read');
        expect(loaded.prompt).toContain('example agent');
    });
});
