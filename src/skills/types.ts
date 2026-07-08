export interface SkillInput {
    parameters?: Record<string, any>;
    facts: Record<string, any>;
    variables: Record<string, any>;
    context: Record<string, any>;
    metadata?: Record<string, string>;
}

export interface SkillResult {
    status: 'success' | 'failed' | 'approval_required';
    output?: any;
    artifacts?: { name: string; content: string }[];
    warnings?: string[];
    errors?: { code: string; message: string; recoverable?: boolean }[];
    metadata?: Record<string, any>;
}

export interface ISkill {
    id: string;
    name: string;
    description: string;
    requiredCapabilities?: string[];
    execute(input: SkillInput): Promise<SkillResult>;
}
