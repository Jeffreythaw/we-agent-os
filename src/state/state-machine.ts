import { AgentState, AgentEvent } from './types.js';

export class StateMachine {
    private state: AgentState = AgentState.CREATED;

    private transitions: Record<AgentState, Partial<Record<AgentEvent, AgentState>>> = {
        [AgentState.CREATED]: {
            [AgentEvent.INITIALIZE]: AgentState.INITIALIZED,
            [AgentEvent.FAIL]: AgentState.FAILED,
        },
        [AgentState.INITIALIZED]: {
            [AgentEvent.START_PLANNING]: AgentState.PLANNING,
            [AgentEvent.FAIL]: AgentState.FAILED,
        },
        [AgentState.PLANNING]: {
            [AgentEvent.START_EXECUTING]: AgentState.EXECUTING,
            [AgentEvent.FAIL]: AgentState.FAILED,
        },
        [AgentState.EXECUTING]: {
            [AgentEvent.START_VERIFYING]: AgentState.VERIFYING,
            [AgentEvent.START_PLANNING]: AgentState.PLANNING, // For Replanning
            [AgentEvent.FAIL]: AgentState.FAILED,
        },
        [AgentState.VERIFYING]: {
            [AgentEvent.COMPLETE]: AgentState.COMPLETED,
            [AgentEvent.START_EXECUTING]: AgentState.EXECUTING, // For fixing errors
            [AgentEvent.FAIL]: AgentState.FAILED,
        },
        [AgentState.COMPLETED]: {},
        [AgentState.FAILED]: {},
    };

    public getState(): AgentState {
        return this.state;
    }

    public transition(event: AgentEvent): AgentState {
        const allowedTransitions = this.transitions[this.state];
        const nextState = allowedTransitions[event];

        if (!nextState) {
            throw new Error(`Invalid state transition: Cannot trigger ${event} from ${this.state}`);
        }

        this.state = nextState;
        return this.state;
    }
}
