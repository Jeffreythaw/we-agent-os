import { describe, it, expect } from 'vitest';
import { ChecklistEngine } from '../src/checklists/checklist-engine.js';
import { Checklist } from '../src/checklists/types.js';

describe('ChecklistEngine', () => {
    const engine = new ChecklistEngine();

    it('should pass when all required items pass', () => {
        const checklist: Checklist = {
            id: 'c1',
            name: 'Basic Setup',
            description: 'Check basic setup',
            items: [
                {
                    id: 'i1',
                    label: 'Has User',
                    required: true,
                    rule: { factKey: 'user', operator: 'exists', severity: 'error', message: 'User needed' }
                }
            ]
        };

        const result = engine.evaluate(checklist, { user: 'bob' });

        expect(result.passed).toBe(true);
        expect(result.requiredFailedCount).toBe(0);
    });

    it('should fail when a required item fails', () => {
        const checklist: Checklist = {
            id: 'c2',
            name: 'Strict Setup',
            description: 'Check strict setup',
            items: [
                {
                    id: 'i1',
                    label: 'Has Config',
                    required: true,
                    rule: { factKey: 'config', operator: 'exists', severity: 'error', message: 'Config needed' }
                }
            ]
        };

        const result = engine.evaluate(checklist, {});

        expect(result.passed).toBe(false);
        expect(result.requiredFailedCount).toBe(1);
    });

    it('should pass when optional warning fails but checklist passes', () => {
        const checklist: Checklist = {
            id: 'c3',
            name: 'Soft Setup',
            description: 'Check soft setup',
            items: [
                {
                    id: 'i1',
                    label: 'Has Avatar',
                    required: false,
                    rule: { factKey: 'avatar', operator: 'exists', severity: 'warning', message: 'Avatar recommended' }
                }
            ]
        };

        const result = engine.evaluate(checklist, {});

        expect(result.passed).toBe(true);
        expect(result.optionalFailedCount).toBe(1);
        expect(result.warningCount).toBe(1);
        expect(result.errorCount).toBe(0);
    });

    it('should fail when optional error fails and checklist fails', () => {
        const checklist: Checklist = {
            id: 'c4',
            name: 'Error Setup',
            description: 'Check error setup',
            items: [
                {
                    id: 'i1',
                    label: 'No Admin In Basic',
                    required: false,
                    rule: { factKey: 'role', operator: 'not_equals', expectedValue: 'admin', severity: 'error', message: 'Admin not allowed' }
                }
            ]
        };

        const result = engine.evaluate(checklist, { role: 'admin' });

        expect(result.passed).toBe(false);
        expect(result.optionalFailedCount).toBe(1);
        expect(result.errorCount).toBe(1);
    });

    it('should handle missing facts safely', () => {
        const checklist: Checklist = {
            id: 'c5',
            name: 'Missing Setup',
            description: 'Check missing setup',
            items: [
                {
                    id: 'i1',
                    label: 'Required String Match',
                    required: true,
                    rule: { factKey: 'status', operator: 'equals', expectedValue: 'active', severity: 'error', message: 'Must be active' }
                }
            ]
        };

        const result = engine.evaluate(checklist, {});

        expect(result.passed).toBe(false);
        expect(result.requiredFailedCount).toBe(1);
        expect(result.errorCount).toBe(1);
    });
});
