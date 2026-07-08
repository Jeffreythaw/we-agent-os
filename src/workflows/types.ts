import { SkillResult } from '../skills/types.js';

export interface WorkflowStep {
    id: string;
    skillId: string;
    parameters?: Record<string, any>;
    metadata?: Record<string, string>;
}

export interface WorkflowInput {
    workflowId: string;
    workflowName: string;
    steps: WorkflowStep[];
    facts: Record<string, any>;
    variables: Record<string, any>;
}

export interface WorkflowArtifact {
    stepId: string;
    content: string;
    name?: string;
}

export interface WorkflowStepResult {
    stepId: string;
    skillId: string;
    passed: boolean;
    result: SkillResult;
}

export interface WorkflowOutput {
    workflowId: string;
    workflowName: string;
    passed: boolean;
    stepResults: WorkflowStepResult[];
    artifacts: WorkflowArtifact[];
    warnings: string[];
    errors: { stepId: string; code: string; message: string }[];
}
