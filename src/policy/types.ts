export enum PolicyDecision {
    ALLOW = 'allow',
    DENY = 'deny',
    REQUIRE_APPROVAL = 'require_approval',
}

export interface PolicyInput {
    action: string;
    resource?: string;
    riskLevel?: number;
    metadata?: Record<string, any>;
}
