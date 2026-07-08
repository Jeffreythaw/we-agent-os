import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import matter from 'gray-matter';
import { AgentManifestSchema, LoadedAgent } from './manifest.js';

export async function loadAgent(agentDir: string): Promise<LoadedAgent> {
    const manifestPath = path.join(agentDir, 'manifest.yaml');
    const promptPath = path.join(agentDir, 'prompt.md');

    const manifestContent = await fs.readFile(manifestPath, 'utf-8');
    const promptContent = await fs.readFile(promptPath, 'utf-8');

    // Parse YAML using gray-matter by wrapping it in frontmatter fences
    const parsed = matter(`---\n${manifestContent}\n---`);
    
    const manifest = AgentManifestSchema.parse(parsed.data);

    return {
        manifest,
        prompt: promptContent,
    };
}
