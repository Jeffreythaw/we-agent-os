import { IExecutionLoop, ExecutionLoopContext } from './types.js';
import { StateMachine } from '../state/state-machine.js';
import { AgentEvent, AgentState } from '../state/types.js';
import { TaskRequest, ExecutionResult } from '../kernel/types.js';
import { LogLevel } from '../audit/types.js';
import crypto from 'node:crypto';

export class ExecutionLoop implements IExecutionLoop {
    private stateMachine: StateMachine;

    constructor(private context: ExecutionLoopContext) {
        this.stateMachine = new StateMachine();
    }

    private async logAndEmit(state: AgentState, message: string) {
        await this.context.auditLogger.append(LogLevel.INFO, 'ExecutionLoop', message);
        await this.context.eventBus.publish({
            id: crypto.randomUUID(),
            type: `execution.${state}`,
            timestamp: Date.now(),
            payload: { message }
        });
    }

    public async run(request: TaskRequest): Promise<ExecutionResult> {
        let providerName = '';
        let estimatedTokens = 0;
        let outputText = '';

        try {
            // INITIALIZE
            this.stateMachine.transition(AgentEvent.INITIALIZE);
            await this.logAndEmit(AgentState.INITIALIZED, 'Execution loop initialized');

            // PLANNING
            this.stateMachine.transition(AgentEvent.START_PLANNING);
            await this.logAndEmit(AgentState.PLANNING, 'Planning task');

            const contextPkg = this.context.contextManager.createContextPackage({
                text: request.text,
                maxTokens: 4096
            });
            estimatedTokens = contextPkg.estimatedTokens;

            const textProviders = this.context.providerRegistry.selectByCapability('text');
            if (textProviders.length === 0) {
                throw new Error('No text-capable provider found.');
            }
            const provider = textProviders[0];
            providerName = provider.name;

            // EXECUTING
            this.stateMachine.transition(AgentEvent.START_EXECUTING);
            await this.logAndEmit(AgentState.EXECUTING, 'Executing task');

            const output = await provider.generate({
                prompt: contextPkg.originalInput
            });
            outputText = output.text;

            // VERIFYING
            this.stateMachine.transition(AgentEvent.START_VERIFYING);
            await this.logAndEmit(AgentState.VERIFYING, 'Verifying execution result');

            // COMPLETED
            this.stateMachine.transition(AgentEvent.COMPLETE);
            await this.logAndEmit(AgentState.COMPLETED, 'Execution completed successfully');

            return {
                status: 'success',
                requestText: request.text,
                providerName,
                estimatedTokens,
                outputText
            };
        } catch (error: any) {
            this.stateMachine.transition(AgentEvent.FAIL);
            await this.logAndEmit(AgentState.FAILED, `Execution failed: ${error.message}`);
            return {
                status: 'failed',
                requestText: request.text,
                outputText: error.message
            };
        }
    }
}
