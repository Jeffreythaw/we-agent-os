import { LLMProvider, ProviderCapability } from './types.js';

export class ProviderRegistry {
    private providers: Map<string, LLMProvider> = new Map();

    public register(provider: LLMProvider): void {
        if (this.providers.has(provider.name)) {
            throw new Error(`Provider with name '${provider.name}' is already registered.`);
        }
        this.providers.set(provider.name, provider);
    }

    public get(name: string): LLMProvider | undefined {
        return this.providers.get(name);
    }

    public list(): LLMProvider[] {
        return Array.from(this.providers.values());
    }

    public selectByCapability(capability: ProviderCapability): LLMProvider[] {
        return this.list().filter(p => p.capabilities.has(capability));
    }
}
