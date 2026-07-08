import { describe, it, expect, vi } from 'vitest';
import { Kernel } from '../src/kernel/kernel.js';

describe('Kernel Integration', () => {
    it('should compose and initialize subsystems', async () => {
        const kernel = new Kernel();
        
        // Spy on event bus publish
        const publishSpy = vi.spyOn(kernel.eventBus, 'publish');
        const appendSpy = vi.spyOn(kernel.auditLogger, 'append');

        await kernel.initialize();

        expect(publishSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'system.initialized' }));
        expect(appendSpy).toHaveBeenCalledWith(expect.anything(), 'Kernel', 'Kernel initialized');
        expect(kernel.policyEngine).toBeDefined();
        expect(kernel.approvalGate).toBeDefined();
        expect(kernel.toolRegistry).toBeDefined();
    });
});
