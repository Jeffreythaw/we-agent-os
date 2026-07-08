export type ProviderCapability = 'text' | 'vision' | 'tool_calling' | 'embeddings' | 'local' | 'remote';

export interface ProviderGenerateInput {
    prompt: string;
    systemPrompt?: string;
}

export interface ProviderGenerateOutput {
    text: string;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
}

export interface LLMProvider {
    name: string;
    capabilities: Set<ProviderCapability>;
    generate(input: ProviderGenerateInput): Promise<ProviderGenerateOutput>;
}
