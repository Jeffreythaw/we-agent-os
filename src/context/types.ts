export interface ContextPackageInput {
    text: string;
    maxTokens: number;
}

export interface ContextPackage {
    originalInput: string;
    estimatedTokens: number;
    maxTokens: number;
    withinBudget: boolean;
    warnings: string[];
}
