import { describe, it, expect, vi } from 'vitest';
import { Kernel } from '../src/kernel/kernel.js';

describe('Kernel', () => {
    it('should initialize and log status', async () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        const kernel = new Kernel();
        
        await kernel.initialize();
        
        expect(consoleSpy).toHaveBeenCalledWith('status: kernel initialized');
        consoleSpy.mockRestore();
    });

    it('should log request text on execute and return result', async () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        const kernel = new Kernel();
        
        const result = await kernel.execute({ text: 'test request' });
        
        expect(consoleSpy).toHaveBeenCalledWith('request text: test request');
        expect(result.status).toBe('success');
        expect(result.requestText).toBe('test request');
        expect(result.providerName).toBe('default-mock');
        consoleSpy.mockRestore();
    });
});
