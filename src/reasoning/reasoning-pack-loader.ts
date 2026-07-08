import fs from 'node:fs/promises';
import path from 'node:path';
import { ReasoningPack, ReasoningPackMetadata, ReasoningProfile } from './types.js';

export class ReasoningPackLoader {
    public async load(packPath: string): Promise<ReasoningPack> {
        const metadataRaw = await fs.readFile(path.join(packPath, 'pack.json'), 'utf-8');
        const metadata: ReasoningPackMetadata = JSON.parse(metadataRaw);

        this.validateMetadata(metadata);

        const profiles: ReasoningProfile[] = [];
        for (const profilePath of metadata.profiles) {
            const rawProfile = await fs.readFile(path.join(packPath, profilePath), 'utf-8');
            const profile: ReasoningProfile = JSON.parse(rawProfile);
            this.validateProfile(profile);
            profiles.push(profile);
        }

        return { metadata, profiles };
    }

    private validateMetadata(metadata: any): void {
        if (!metadata.id || !metadata.name || !metadata.version || !Array.isArray(metadata.profiles)) {
            throw new Error('Invalid Reasoning Pack Metadata');
        }
    }

    private validateProfile(profile: any): void {
        if (!profile.id || !profile.name || !profile.perspective || !Array.isArray(profile.deterministicChecks) || !profile.escalationPolicy) {
            throw new Error(`Invalid Reasoning Profile: ${profile.id || 'unknown'}`);
        }
    }
}
