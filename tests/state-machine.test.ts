import { describe, it, expect } from 'vitest';
import { StateMachine } from '../src/state/state-machine.js';
import { AgentState, AgentEvent } from '../src/state/types.js';

describe('StateMachine', () => {
    it('should initialize in CREATED state', () => {
        const sm = new StateMachine();
        expect(sm.getState()).toBe(AgentState.CREATED);
    });

    it('should transition correctly through valid states', () => {
        const sm = new StateMachine();
        sm.transition(AgentEvent.INITIALIZE);
        expect(sm.getState()).toBe(AgentState.INITIALIZED);
        
        sm.transition(AgentEvent.START_PLANNING);
        expect(sm.getState()).toBe(AgentState.PLANNING);
    });

    it('should throw error on invalid transition', () => {
        const sm = new StateMachine();
        // Cannot complete from CREATED
        expect(() => sm.transition(AgentEvent.COMPLETE)).toThrow(/Invalid state transition/);
    });
});
