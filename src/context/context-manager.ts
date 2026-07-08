import { ContextPackage, ContextPackageInput } from './types.js';

export class ContextManager {
    /**
     * Simple deterministic approximation of tokens.
     * Roughly 1 token per 4 characters.
     */
    public estimateTokens(text: string): number {
        return Math.ceil(text.length / 4);
    }

    public checkBudget(text: string, maxTokens: number): boolean {
        return this.estimateTokens(text) <= maxTokens;
    }

    public createContextPackage(input: ContextPackageInput): ContextPackage {
        const estimatedTokens = this.estimateTokens(input.text);
        const withinBudget = estimatedTokens <= input.maxTokens;
        const warnings: string[] = [];

        if (!withinBudget) {
            warnings.push(`Warning: Estimated tokens (${estimatedTokens}) exceeds maxTokens (${input.maxTokens}). Context may be truncated.`);
        }

        return {
            originalInput: input.text,
            estimatedTokens,
            maxTokens: input.maxTokens,
            withinBudget,
            warnings
        };
    }
}
