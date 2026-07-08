import { describe, it, expect } from 'vitest';
import { MockProvider } from '../src/providers/mock-provider.js';

describe('MockProvider', () => {
    it('should return deterministic output', async () => {
        const provider = new MockProvider('test-mock', ['text'], 'Hello from mock');
        
        const output = await provider.generate({ prompt: 'Say hello' });
        
        expect(output.text).toBe('Hello from mock');
        expect(output.usage?.totalTokens).toBe(20);
    });
});
