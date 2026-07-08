import { LLMProvider, ProviderCapability, ProviderGenerateInput, ProviderGenerateOutput } from './types.js';

export class MockProvider implements LLMProvider {
    public name: string;
    public capabilities: Set<ProviderCapability>;
    public response: string;

    constructor(
        name: string = 'mock-provider',
        capabilities: ProviderCapability[] = ['text', 'local'],
        response: string = 'Mock response'
    ) {
        this.name = name;
        this.capabilities = new Set(capabilities);
        this.response = response;
    }

    public async generate(input: ProviderGenerateInput): Promise<ProviderGenerateOutput> {
        return {
            text: this.response,
            usage: {
                promptTokens: 10,
                completionTokens: 10,
                totalTokens: 20
            }
        };
    }
}
