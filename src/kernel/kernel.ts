import { KernelOptions, TaskRequest, ExecutionResult } from './types.js';
import { EventBus } from '../events/event-bus.js';
import { AuditLogger } from '../audit/audit-logger.js';
import { PolicyEngine } from '../policy/policy-engine.js';
import { ApprovalGate } from '../approval/approval-gate.js';
import { ToolRegistry } from '../tools/tool-registry.js';
import { ContextManager } from '../context/context-manager.js';
import { ProviderRegistry } from '../providers/provider-registry.js';
import { MockProvider } from '../providers/mock-provider.js';
import { LogLevel } from '../audit/types.js';
import { ExecutionLoop } from '../execution/execution-loop.js';
import { SkillRegistry } from '../skills/skill-registry.js';
import { WorkflowRunner } from '../workflows/workflow-runner.js';
import { SystemRuleCheckSkill } from '../skills/system-rule-check-skill.js';
import { SystemChecklistSkill } from '../skills/system-checklist-skill.js';
import { SystemTemplateRenderSkill } from '../skills/system-template-render-skill.js';
import { WorkflowInput, WorkflowOutput } from '../workflows/types.js';
import crypto from 'node:crypto';

export class Kernel {
    public eventBus: EventBus;
    public auditLogger: AuditLogger;
    public policyEngine: PolicyEngine;
    public approvalGate: ApprovalGate;
    public toolRegistry: ToolRegistry;
    public contextManager: ContextManager;
    public providerRegistry: ProviderRegistry;
    public skillRegistry: SkillRegistry;
    public workflowRunner: WorkflowRunner;

    constructor(private options: KernelOptions = {}) {
        this.eventBus = options.eventBus ?? new EventBus();
        this.auditLogger = options.auditLogger ?? new AuditLogger();
        this.policyEngine = options.policyEngine ?? new PolicyEngine();
        this.approvalGate = options.approvalGate ?? new ApprovalGate();
        this.toolRegistry = options.toolRegistry ?? new ToolRegistry();
        this.contextManager = options.contextManager ?? new ContextManager();
        this.providerRegistry = options.providerRegistry ?? new ProviderRegistry();
        this.skillRegistry = options.skillRegistry ?? new SkillRegistry();
        this.workflowRunner = options.workflowRunner ?? new WorkflowRunner(this.skillRegistry);

        if (this.providerRegistry.list().length === 0) {
            this.providerRegistry.register(new MockProvider('default-mock'));
        }

        if (!this.skillRegistry.has('system.rule_check')) {
            this.skillRegistry.register(new SystemRuleCheckSkill());
        }
        if (!this.skillRegistry.has('system.checklist_check')) {
            this.skillRegistry.register(new SystemChecklistSkill());
        }
        if (!this.skillRegistry.has('system.template_render')) {
            this.skillRegistry.register(new SystemTemplateRenderSkill());
        }
    }

    public async initialize(): Promise<void> {
        await this.auditLogger.initialize();
        
        const initEvent = {
            id: crypto.randomUUID(),
            type: 'system.initialized',
            timestamp: Date.now(),
            payload: { status: 'Kernel initialized' }
        };
        
        await this.eventBus.publish(initEvent);
        await this.auditLogger.append(LogLevel.INFO, 'Kernel', 'Kernel initialized');
        
        console.log('status: kernel initialized');
    }

    public async execute(request: TaskRequest): Promise<ExecutionResult> {
        console.log(`request text: ${request.text}`);

        const loop = new ExecutionLoop({
            eventBus: this.eventBus,
            auditLogger: this.auditLogger,
            providerRegistry: this.providerRegistry,
            contextManager: this.contextManager
        });

        return loop.run(request);
    }

    public async executeWorkflow(input: WorkflowInput): Promise<WorkflowOutput> {
        const wfEvent = {
            id: crypto.randomUUID(),
            type: 'workflow.started',
            timestamp: Date.now(),
            payload: { workflowId: input.workflowId }
        };
        await this.eventBus.publish(wfEvent);
        await this.auditLogger.append(LogLevel.INFO, 'Kernel', `Executing workflow: ${input.workflowId}`);

        const result = await this.workflowRunner.run(input);

        const doneEvent = {
            id: crypto.randomUUID(),
            type: 'workflow.completed',
            timestamp: Date.now(),
            payload: { workflowId: input.workflowId, passed: result.passed }
        };
        await this.eventBus.publish(doneEvent);
        await this.auditLogger.append(LogLevel.INFO, 'Kernel', `Completed workflow: ${input.workflowId} with passed=${result.passed}`);

        return result;
    }
}
