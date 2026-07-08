import { describe, it, expect } from 'vitest';
import { ReasoningPackLoader } from '../src/reasoning/reasoning-pack-loader.js';
import path from 'node:path';

describe('ReasoningPackLoader', () => {
    it('should successfully load the six-hats reasoning pack', async () => {
        const loader = new ReasoningPackLoader();
        const packPath = path.join(process.cwd(), 'knowledge/reasoning/six-hats');
        
        const pack = await loader.load(packPath);

        expect(pack.metadata.id).toBe('we.reasoning.six_hats');
        expect(pack.metadata.profiles.length).toBe(6);
        expect(pack.profiles.length).toBe(6);

        const whiteHat = pack.profiles.find(p => p.id === 'hat_white');
        expect(whiteHat).toBeDefined();
        expect(whiteHat?.perspective).toBe('Data and Facts');
        expect(whiteHat?.deterministicChecks.length).toBe(1);
        expect(whiteHat?.escalationPolicy.allowLLM).toBe(false);
    });

    it('should throw on missing pack.json', async () => {
        const loader = new ReasoningPackLoader();
        const invalidPath = path.join(process.cwd(), 'knowledge/invalid');
        
        await expect(loader.load(invalidPath)).rejects.toThrow();
    });
});
