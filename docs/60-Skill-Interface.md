# Skill Interface

## 1. Skill Purpose
Skills are the foundational, reusable atomic units of work within WE Agent OS. They encapsulate discrete capabilities (e.g., "Read File", "Validate JSON", "Deploy to Vercel") into a standard interface. They abstract the underlying rule, checklist, template, and tool engines into a single, predictable contract that can be orchestrated by the Workflow Composer.

## 2. ISkill Contract
Every skill must implement the following base contract:
```typescript
interface ISkill {
    id: string;
    name: string;
    description: string;
    version: string;
    execute(input: SkillInput, context: ExecutionContext): Promise<SkillResult>;
}
```

## 3. SkillInput
The input to a skill must be a strictly validated payload.
```typescript
interface SkillInput {
    parameters: Record<string, any>;
    facts: Record<string, any>;
    metadata?: Record<string, string>;
}
```

## 4. SkillResult
Skills must return structured results indicating success, failure, or a need for external intervention. They must not throw exceptions for expected operational failures (e.g., validation errors).
```typescript
interface SkillResult {
    status: 'success' | 'failed' | 'approval_required';
    data?: any;
    error?: SkillError;
    artifacts?: WorkflowArtifact[];
    metrics?: {
        durationMs: number;
        tokensUsed?: number;
    };
}
```

## 5. SkillError
When a skill fails operationally, it returns a typed error object rather than throwing.
```typescript
interface SkillError {
    code: string;
    message: string;
    details?: any;
    recoverable: boolean;
}
```

## 6. SkillRegistry
The SkillRegistry is responsible for discovering, validating, and loading skills into the OS memory space. It prevents duplicate registrations, enforces versioning, and provides the Workflow Runner with the requested skill instances.

## 7. Skill Lifecycle
1. **Load**: Registry reads skill definition.
2. **Initialize**: Skill validates its own configuration and dependencies.
3. **Execute**: Workflow Runner calls `execute()`.
4. **Evaluate**: Skill calls underlying Rule/Checklist/Template engines.
5. **Return**: Skill structures the result and returns to the Runner.

## 8. Error Handling
- **Expected Failures**: (e.g., "File not found", "Regex mismatch") The skill returns `status: 'failed'` with a populated `SkillError` object.
- **Unexpected Panics**: (e.g., out of memory, catastrophic VM failure) Allowed to throw, to be caught globally by the Execution Loop and transitioned to a FATAL state.

## 9. Approval Handling
If a skill intends to execute a high-risk operation (e.g., `DROP TABLE`, `SEND EMAIL`), it must consult the Policy Engine. If approval is required, the skill halts execution and returns `status: 'approval_required'`, allowing the OS to suspend the task and wait for human intervention.

## 10. Logging and Audit Behavior
Skills do not manage their own audit logs directly. Instead, they emit structured events via the `EventBus` provided in the `ExecutionContext`. The OS Audit Logger intercepts these events.

## 11. How Workflow Runner Invokes Skills
The Workflow Runner treats the Skill as a black box. The runner looks up the step's required skill in the SkillRegistry, passes the accumulated workflow state as `SkillInput`, awaits the `SkillResult`, and determines whether to proceed to the next step, halt on failure, or suspend for approval based purely on the `status` string.

## 12. Why workflows depend on skills, not directly on rule/checklist/template services
Workflows depend on Skills to maintain a strict separation of concerns. If a workflow called the RuleEngine directly, the workflow definition would become tightly coupled to the internal mechanics of the OS engines. By wrapping capabilities in Skills:
- **Portability**: Skills can be shared across different workspaces.
- **Polymorphism**: A "Validate Schema" skill could use the Rule Engine today, and an LLM Provider tomorrow (if policy allows), without changing the workflow.
- **Auditability**: Skills provide a natural boundary for emitting clear, domain-specific audit events.

## Constraints
- **Stateless by Default**: Skills must not maintain internal state between executions.
- **Engine Composition**: Skills are encouraged to delegate logic to the RuleService, ChecklistService, TemplateService, and ToolService.
- **AI Restriction**: Skills must not invoke external LLM APIs unless the AI Escalation Policy explicitly permits it.
- **No Throwing**: Skills must return `SkillResult`, not throw, for standard domain errors.
- **Approval Native**: High-risk actions must natively return `approval_required`.
