import { describe, it, expect, vi } from 'vitest';
import { ExecutionLoop } from '../src/execution/execution-loop.js';
import { EventBus } from '../src/events/event-bus.js';
import { AuditLogger } from '../src/audit/audit-logger.js';
import { ProviderRegistry } from '../src/providers/provider-registry.js';
import { ContextManager } from '../src/context/context-manager.js';
import { MockProvider } from '../src/providers/mock-provider.js';

describe('ExecutionLoop', () => {
    it('should run through all states successfully', async () => {
        const eventBus = new EventBus();
        const auditLogger = new AuditLogger();
        const providerRegistry = new ProviderRegistry();
        const contextManager = new ContextManager();
        
        providerRegistry.register(new MockProvider('test-mock'));
        
        const publishSpy = vi.spyOn(eventBus, 'publish');
        
        const loop = new ExecutionLoop({
            eventBus,
            auditLogger,
            providerRegistry,
            contextManager
        });
        
        const result = await loop.run({ text: 'Run loop' });
        
        expect(result.status).toBe('success');
        expect(result.providerName).toBe('test-mock');
        
        // Should have published events for all states
        expect(publishSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'execution.initialized' }));
        expect(publishSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'execution.planning' }));
        expect(publishSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'execution.executing' }));
        expect(publishSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'execution.verifying' }));
        expect(publishSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'execution.completed' }));
    });

    it('should fail if no provider is found', async () => {
        const eventBus = new EventBus();
        const auditLogger = new AuditLogger();
        const providerRegistry = new ProviderRegistry();
        const contextManager = new ContextManager();
        
        const publishSpy = vi.spyOn(eventBus, 'publish');
        
        const loop = new ExecutionLoop({
            eventBus,
            auditLogger,
            providerRegistry,
            contextManager
        });
        
        const result = await loop.run({ text: 'Run loop' });
        
        expect(result.status).toBe('failed');
        expect(result.outputText).toMatch(/No text-capable provider found/);
        
        expect(publishSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'execution.failed' }));
    });
});
