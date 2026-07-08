import { describe, it, expect } from 'vitest';
import { RuleEngine } from '../src/rules/rule-engine.js';
import { Rule } from '../src/rules/types.js';

describe('RuleEngine', () => {
    const engine = new RuleEngine();

    it('should evaluate exists and missing operators', () => {
        const rules: Rule[] = [
            { factKey: 'user', operator: 'exists', severity: 'error', message: 'User must exist' },
            { factKey: 'password', operator: 'missing', severity: 'error', message: 'Password must not be in payload' }
        ];

        const facts = { user: 'john' };
        const result = engine.evaluate(rules, facts);

        expect(result.passed).toBe(true);
        expect(result.failedCount).toBe(0);
    });

    it('should evaluate equals and not_equals operators', () => {
        const rules: Rule[] = [
            { factKey: 'status', operator: 'equals', expectedValue: 'active', severity: 'error', message: 'Status must be active' },
            { factKey: 'role', operator: 'not_equals', expectedValue: 'admin', severity: 'error', message: 'Role must not be admin' }
        ];

        const facts = { status: 'active', role: 'user' };
        const result = engine.evaluate(rules, facts);

        expect(result.passed).toBe(true);
    });

    it('should evaluate contains and not_contains operators on strings', () => {
        const rules: Rule[] = [
            { factKey: 'email', operator: 'contains', expectedValue: '@', severity: 'error', message: 'Email must contain @' },
            { factKey: 'email', operator: 'not_contains', expectedValue: 'admin', severity: 'error', message: 'Email must not contain admin' }
        ];

        const facts = { email: 'user@example.com' };
        const result = engine.evaluate(rules, facts);

        expect(result.passed).toBe(true);
    });

    it('should evaluate regex operator', () => {
        const rules: Rule[] = [
            { factKey: 'version', operator: 'regex', expectedValue: '^v\\d+\\.\\d+\\.\\d+$', severity: 'error', message: 'Version must match semver' }
        ];

        const facts = { version: 'v1.0.0' };
        const result = engine.evaluate(rules, facts);

        expect(result.passed).toBe(true);
        
        const failedFacts = { version: '1.0' };
        const failedResult = engine.evaluate(rules, failedFacts);
        
        expect(failedResult.passed).toBe(false);
    });

    it('should fail safely on missing facts', () => {
        const rules: Rule[] = [
            { factKey: 'unknown', operator: 'equals', expectedValue: 'value', severity: 'error', message: 'Unknown fact' }
        ];

        const result = engine.evaluate(rules, {});

        expect(result.passed).toBe(false);
        expect(result.errorCount).toBe(1);
    });

    it('should calculate severity counts correctly', () => {
        const rules: Rule[] = [
            { factKey: 'f1', operator: 'equals', expectedValue: '1', severity: 'info', message: 'Info' },
            { factKey: 'f2', operator: 'equals', expectedValue: '2', severity: 'warning', message: 'Warning' },
            { factKey: 'f3', operator: 'equals', expectedValue: '3', severity: 'error', message: 'Error' },
            { factKey: 'f4', operator: 'equals', expectedValue: '4', severity: 'error', message: 'Error 2' }
        ];

        const facts = { f4: '4' }; // f1, f2, f3 will fail
        const result = engine.evaluate(rules, facts);

        expect(result.passed).toBe(false); // Because there is 1 error
        expect(result.failedCount).toBe(3);
        expect(result.errorCount).toBe(1);
        expect(result.warningCount).toBe(1);
    });
});
