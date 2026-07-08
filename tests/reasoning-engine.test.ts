import { describe, it, expect } from 'vitest';
import { ReasoningEngine } from '../src/reasoning/reasoning-engine.js';
import path from 'node:path';

describe('ReasoningEngine', () => {
    it('should run six-hats pack and evaluate deterministic checks identifying failures', async () => {
        const engine = new ReasoningEngine();
        const packPath = path.join(process.cwd(), 'knowledge/reasoning/six-hats');
        
        const contextFacts = {
            "context.problemStatement": "Migrate DB",
            // missing "context.securityRequirements" -> Black Hat fails
            // missing "context.taskType" -> Blue Hat fails
        };

        const result = await engine.run(packPath, 'task-001', contextFacts);

        expect(result.taskId).toBe('task-001');
        
        // White Hat passes (problemStatement exists)
        // Black Hat fails (securityRequirements missing) -> adds a risk
        // Blue Hat fails (taskType missing) -> adds clarificationQuestion
        
        expect(result.readyForExecution).toBe(false);
        expect(result.risks.length).toBe(1);
        expect(result.risks[0].description).toContain('Security requirements');
        expect(result.clarificationQuestions.length).toBe(1);
        expect(result.readinessScore).toBeLessThan(80);
    });

    it('should pass all checks if facts are complete', async () => {
        const engine = new ReasoningEngine();
        const packPath = path.join(process.cwd(), 'knowledge/reasoning/six-hats');
        
        const contextFacts = {
            "context.problemStatement": "Migrate DB",
            "context.securityRequirements": "SSL required",
            "context.taskType": "migration"
        };

        const result = await engine.run(packPath, 'task-002', contextFacts);

        expect(result.readyForExecution).toBe(true);
        expect(result.risks.length).toBe(0);
        expect(result.missingInformation.length).toBe(0);
        expect(result.clarificationQuestions.length).toBe(0);
    });
});
