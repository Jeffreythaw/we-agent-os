import { describe, it, expect } from 'vitest';
import { PolicyEngine } from '../src/policy/policy-engine.js';
import { PolicyDecision } from '../src/policy/types.js';

describe('PolicyEngine', () => {
    it('should allow read actions', () => {
        const engine = new PolicyEngine();
        const decision = engine.evaluateRequest({ action: 'read' });
        expect(decision).toBe(PolicyDecision.ALLOW);
    });

    it('should deny delete actions', () => {
        const engine = new PolicyEngine();
        const decision = engine.evaluateRequest({ action: 'delete' });
        expect(decision).toBe(PolicyDecision.DENY);
    });

    it('should require approval for write actions', () => {
        const engine = new PolicyEngine();
        const decision = engine.evaluateRequest({ action: 'write' });
        expect(decision).toBe(PolicyDecision.REQUIRE_APPROVAL);
    });

    it('should require approval for unknown actions', () => {
        const engine = new PolicyEngine();
        const decision = engine.evaluateRequest({ action: 'unknown_action' });
        expect(decision).toBe(PolicyDecision.REQUIRE_APPROVAL);
    });
});
