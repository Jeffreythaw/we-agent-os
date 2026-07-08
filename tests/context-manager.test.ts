import { describe, it, expect } from 'vitest';
import { ContextManager } from '../src/context/context-manager.js';

describe('ContextManager', () => {
    it('should estimate tokens based on length', () => {
        const manager = new ContextManager();
        // 12 chars -> 12 / 4 = 3 tokens
        expect(manager.estimateTokens('Hello world!')).toBe(3);
    });

    it('should check budget correctly', () => {
        const manager = new ContextManager();
        const text = 'This is a somewhat long text.'; // 29 chars -> 8 tokens
        expect(manager.checkBudget(text, 10)).toBe(true);
        expect(manager.checkBudget(text, 5)).toBe(false);
    });

    it('should create context package within budget without warnings', () => {
        const manager = new ContextManager();
        const pkg = manager.createContextPackage({
            text: 'Small text', // 10 chars -> 3 tokens
            maxTokens: 50
        });

        expect(pkg.originalInput).toBe('Small text');
        expect(pkg.estimatedTokens).toBe(3);
        expect(pkg.maxTokens).toBe(50);
        expect(pkg.withinBudget).toBe(true);
        expect(pkg.warnings.length).toBe(0);
    });

    it('should create context package over budget with warnings', () => {
        const manager = new ContextManager();
        const pkg = manager.createContextPackage({
            text: 'This is a very long text that will definitely exceed the small max token limit we set.', // 86 chars -> 22 tokens
            maxTokens: 10
        });

        expect(pkg.originalInput).toBeDefined();
        expect(pkg.estimatedTokens).toBe(22);
        expect(pkg.maxTokens).toBe(10);
        expect(pkg.withinBudget).toBe(false);
        expect(pkg.warnings.length).toBe(1);
        expect(pkg.warnings[0]).toMatch(/exceeds maxTokens/);
    });
});
