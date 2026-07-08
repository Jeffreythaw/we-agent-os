import { TaskRequest, ExecutionResult } from '../kernel/types.js';
import { EventBus } from '../events/event-bus.js';
import { AuditLogger } from '../audit/audit-logger.js';
import { ProviderRegistry } from '../providers/provider-registry.js';
import { ContextManager } from '../context/context-manager.js';

export interface ExecutionLoopContext {
    eventBus: EventBus;
    auditLogger: AuditLogger;
    providerRegistry: ProviderRegistry;
    contextManager: ContextManager;
}

export interface IExecutionLoop {
    run(request: TaskRequest): Promise<ExecutionResult>;
}
