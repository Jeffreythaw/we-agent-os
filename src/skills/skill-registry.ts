import { ISkill } from './types.js';

export class SkillRegistry {
    private skills: Map<string, ISkill> = new Map();

    public register(skill: ISkill): void {
        if (this.skills.has(skill.id)) {
            throw new Error(`Skill with id '${skill.id}' is already registered.`);
        }
        this.skills.set(skill.id, skill);
    }

    public get(id: string): ISkill | undefined {
        return this.skills.get(id);
    }

    public list(): ISkill[] {
        return Array.from(this.skills.values());
    }

    public has(id: string): boolean {
        return this.skills.has(id);
    }
}
