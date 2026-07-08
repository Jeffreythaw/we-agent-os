export enum AgentState {
    CREATED = 'created',
    INITIALIZED = 'initialized',
    PLANNING = 'planning',
    EXECUTING = 'executing',
    VERIFYING = 'verifying',
    COMPLETED = 'completed',
    FAILED = 'failed',
}

export enum AgentEvent {
    INITIALIZE = 'initialize',
    START_PLANNING = 'start_planning',
    START_EXECUTING = 'start_executing',
    START_VERIFYING = 'start_verifying',
    COMPLETE = 'complete',
    FAIL = 'fail',
}
