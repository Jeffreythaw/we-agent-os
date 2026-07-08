import { 
    WorkflowInput, 
    WorkflowOutput, 
    WorkflowStepResult, 
    WorkflowArtifact 
} from './types.js';
import { SkillRegistry } from '../skills/skill-registry.js';
import { SkillInput, SkillResult } from '../skills/types.js';

export class WorkflowRunner {
    private skillRegistry: SkillRegistry;

    constructor(skillRegistry: SkillRegistry) {
        this.skillRegistry = skillRegistry;
    }

    public async run(input: WorkflowInput): Promise<WorkflowOutput> {
        const stepResults: WorkflowStepResult[] = [];
        const artifacts: WorkflowArtifact[] = [];
        const warnings: string[] = [];
        const errors: { stepId: string; code: string; message: string }[] = [];
        let passed = true;

        for (const step of input.steps) {
            let stepPassed = true;
            let result: SkillResult;

            const skill = this.skillRegistry.get(step.skillId);
            
            if (!skill) {
                stepPassed = false;
                result = {
                    status: 'failed',
                    errors: [{ code: 'SKILL_NOT_FOUND', message: `Skill '${step.skillId}' not found in registry.` }]
                };
            } else {
                const skillInput: SkillInput = {
                    facts: input.facts || {},
                    variables: input.variables || {},
                    parameters: step.parameters || {},
                    context: {},
                    metadata: step.metadata || {}
                };

                try {
                    result = await skill.execute(skillInput);
                    if (result.status !== 'success') {
                        stepPassed = false;
                    }
                } catch (e: any) {
                    stepPassed = false;
                    result = {
                        status: 'failed',
                        errors: [{ code: 'EXECUTION_ERROR', message: e.message }]
                    };
                }
            }

            if (result.artifacts && result.artifacts.length > 0) {
                for (const artifact of result.artifacts) {
                    artifacts.push({
                        stepId: step.id,
                        name: artifact.name,
                        content: artifact.content
                    });
                }
            }

            if (result.warnings && result.warnings.length > 0) {
                warnings.push(...result.warnings);
            }

            if (result.errors && result.errors.length > 0) {
                for (const err of result.errors) {
                    errors.push({ stepId: step.id, code: err.code, message: err.message });
                }
            }

            stepResults.push({
                stepId: step.id,
                skillId: step.skillId,
                passed: stepPassed,
                result
            });

            if (!stepPassed) {
                passed = false;
                break;
            }
        }

        return {
            workflowId: input.workflowId,
            workflowName: input.workflowName,
            passed,
            stepResults,
            artifacts,
            warnings,
            errors
        };
    }
}
