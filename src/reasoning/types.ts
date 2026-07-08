import { Rule } from '../rules/types.js';

export interface ReasoningPackMetadata {
    id: string;
    name: string;
    version: string;
    author: string;
    description: string;
    profiles: string[];
}

export interface EscalationPolicy {
    allowLLM: boolean;
}

export interface ReasoningProfile {
    id: string;
    name: string;
    description: string;
    perspective: string;
    deterministicChecks: Rule[];
    outputSchemaHints?: Record<string, string>;
    escalationPolicy: EscalationPolicy;
}

export interface ReasoningPack {
    metadata: ReasoningPackMetadata;
    profiles: ReasoningProfile[];
}

export interface RiskItem {
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    mitigationProposed?: string;
}

export interface ReasoningOutput {
    profileId: string;
    timestamp: number;
    insights: string[];
    risks: RiskItem[];
    opportunities: string[];
    missingFacts: string[];
    passedDeterministic: boolean;
    confidence: number;
    clarificationQuestions?: string[];
}

export interface ConsensusOutput {
    taskId: string;
    agreements: string[];
    conflicts: string[];
    missingInformation: string[];
    risks: RiskItem[];
    opportunities: string[];
    clarificationQuestions: string[];
    confidenceScore: number;
    readinessScore: number;
    readyForExecution: boolean;
}
