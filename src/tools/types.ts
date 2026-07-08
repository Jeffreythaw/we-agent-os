import { z } from 'zod';

export interface Tool<TInput = any, TOutput = any> {
    name: string;
    description: string;
    riskLevel: number;
    inputSchema: z.ZodType<TInput>;
    execute(input: TInput): Promise<TOutput>;
}
