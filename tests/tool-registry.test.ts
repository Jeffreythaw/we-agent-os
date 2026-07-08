import { describe, it, expect } from 'vitest';
import { ToolRegistry } from '../src/tools/tool-registry.js';
import { Tool } from '../src/tools/types.js';
import { z } from 'zod';

describe('ToolRegistry', () => {
    it('should register and retrieve a tool', () => {
        const registry = new ToolRegistry();
        const dummyTool: Tool = {
            name: 'test-tool',
            description: 'A test tool',
            riskLevel: 1,
            inputSchema: z.object({}),
            execute: async () => 'result'
        };

        registry.register(dummyTool);
        const retrieved = registry.get('test-tool');
        expect(retrieved).toBeDefined();
        expect(retrieved?.name).toBe('test-tool');
        
        const all = registry.list();
        expect(all.length).toBe(1);
    });

    it('should throw on duplicate tool registration', () => {
        const registry = new ToolRegistry();
        const dummyTool: Tool = {
            name: 'dup-tool',
            description: 'A test tool',
            riskLevel: 1,
            inputSchema: z.object({}),
            execute: async () => 'result'
        };

        registry.register(dummyTool);
        expect(() => registry.register(dummyTool)).toThrow(/already registered/);
    });
});
