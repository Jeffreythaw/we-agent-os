import { describe, it, expect } from 'vitest';
import { SkillRegistry } from '../src/skills/skill-registry.js';
import { ISkill, SkillInput, SkillResult } from '../src/skills/types.js';

class MockSkill implements ISkill {
    id: string;
    name: string;
    description: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.description = `Mock skill for ${name}`;
    }

    async execute(input: SkillInput): Promise<SkillResult> {
        return {
            status: 'success',
            output: 'mock result'
        };
    }
}

describe('SkillRegistry', () => {
    it('should register and retrieve a skill', () => {
        const registry = new SkillRegistry();
        const skill = new MockSkill('s-1', 'Test Skill');
        
        registry.register(skill);
        
        const retrieved = registry.get('s-1');
        expect(retrieved).toBeDefined();
        expect(retrieved?.id).toBe('s-1');
        expect(retrieved?.name).toBe('Test Skill');
        
        expect(registry.has('s-1')).toBe(true);
        expect(registry.list().length).toBe(1);
    });

    it('should throw error on duplicate registration', () => {
        const registry = new SkillRegistry();
        const skill = new MockSkill('s-2', 'Dup Skill');
        
        registry.register(skill);
        
        expect(() => registry.register(skill)).toThrow(/already registered/);
    });

    it('should return undefined for non-existent skill', () => {
        const registry = new SkillRegistry();
        expect(registry.get('missing')).toBeUndefined();
        expect(registry.has('missing')).toBe(false);
    });
});
