import { describe, it, expect } from 'vitest';
import { ProviderRegistry } from '../src/providers/provider-registry.js';
import { MockProvider } from '../src/providers/mock-provider.js';

describe('ProviderRegistry', () => {
    it('should register and retrieve a provider', () => {
        const registry = new ProviderRegistry();
        const provider = new MockProvider('test-provider');
        
        registry.register(provider);
        
        const retrieved = registry.get('test-provider');
        expect(retrieved).toBeDefined();
        expect(retrieved?.name).toBe('test-provider');
        
        const all = registry.list();
        expect(all.length).toBe(1);
    });

    it('should throw on duplicate provider registration', () => {
        const registry = new ProviderRegistry();
        const provider = new MockProvider('dup-provider');
        
        registry.register(provider);
        expect(() => registry.register(provider)).toThrow(/already registered/);
    });

    it('should select providers by capability', () => {
        const registry = new ProviderRegistry();
        
        const localText = new MockProvider('local-1', ['local', 'text']);
        const remoteVision = new MockProvider('remote-1', ['remote', 'vision']);
        const localVision = new MockProvider('local-2', ['local', 'vision']);

        registry.register(localText);
        registry.register(remoteVision);
        registry.register(localVision);

        const localProviders = registry.selectByCapability('local');
        expect(localProviders.length).toBe(2);
        expect(localProviders.some(p => p.name === 'local-1')).toBe(true);
        expect(localProviders.some(p => p.name === 'local-2')).toBe(true);

        const visionProviders = registry.selectByCapability('vision');
        expect(visionProviders.length).toBe(2);
    });
});
