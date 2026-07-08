import { describe, it, expect } from 'vitest';
import { Kernel } from '../src/kernel/kernel.js';
import { ProviderRegistry } from '../src/providers/provider-registry.js';
import { MockProvider } from '../src/providers/mock-provider.js';

describe('Kernel Provider and Context Integration', () => {
    it('should default to registering a mock provider', async () => {
        const kernel = new Kernel();
        const providers = kernel.providerRegistry.list();
        expect(providers.length).toBe(1);
        expect(providers[0].name).toBe('default-mock');
    });

    it('should allow injecting a custom provider registry', async () => {
        const customRegistry = new ProviderRegistry();
        customRegistry.register(new MockProvider('custom-mock'));
        
        const kernel = new Kernel({ providerRegistry: customRegistry });
        const providers = kernel.providerRegistry.list();
        
        expect(providers.length).toBe(1);
        expect(providers[0].name).toBe('custom-mock');
    });

    it('should execute a request through context and provider', async () => {
        const kernel = new Kernel();
        await kernel.initialize();
        
        const result = await kernel.execute({ text: 'Hello integration' });
        
        expect(result.status).toBe('success');
        expect(result.requestText).toBe('Hello integration');
        expect(result.providerName).toBe('default-mock');
        // 'Hello integration' is 17 chars -> 17/4 = 5 tokens
        expect(result.estimatedTokens).toBe(5);
        expect(result.outputText).toBe('Mock response');
    });
});
