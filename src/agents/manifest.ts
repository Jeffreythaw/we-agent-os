import { z } from 'zod';

export const AgentManifestSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
    model: z.string().default('ollama/llama3'),
    tools: z.array(z.string()).default([]),
});

export type AgentManifest = z.infer<typeof AgentManifestSchema>;

export interface LoadedAgent {
    manifest: AgentManifest;
    prompt: string;
}
