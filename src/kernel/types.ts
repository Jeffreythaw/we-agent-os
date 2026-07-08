import { EventBus } from '../events/event-bus.js';
import { AuditLogger } from '../audit/audit-logger.js';
import { PolicyEngine } from '../policy/policy-engine.js';
import { ApprovalGate } from '../approval/approval-gate.js';
import { ToolRegistry } from '../tools/tool-registry.js';
import { ContextManager } from '../context/context-manager.js';
import { ProviderRegistry } from '../providers/provider-registry.js';
import { SkillRegistry } from '../skills/skill-registry.js';
import { WorkflowRunner } from '../workflows/workflow-runner.js';
import { WorkflowInput, WorkflowOutput } from '../workflows/types.js';

export interface KernelOptions {
    logLevel?: 'debug' | 'info' | 'warn' | 'error';
    eventBus?: EventBus;
    auditLogger?: AuditLogger;
    policyEngine?: PolicyEngine;
    approvalGate?: ApprovalGate;
    toolRegistry?: ToolRegistry;
    contextManager?: ContextManager;
    providerRegistry?: ProviderRegistry;
    skillRegistry?: SkillRegistry;
    workflowRunner?: WorkflowRunner;
}

export interface TaskRequest {
    text: string;
}

export interface ExecutionResult {
    status: string;
    requestText: string;
    providerName?: string;
    estimatedTokens?: number;
    outputText?: string;
}
