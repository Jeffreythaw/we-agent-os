import { ISkill, SkillInput, SkillResult } from './types.js';
import { TemplateEngine } from '../templates/template-engine.js';

export class SystemTemplateRenderSkill implements ISkill {
    public id = 'system.template_render';
    public name = 'System Template Render';
    public description = 'Renders a template into a text artifact.';
    public version = '1.0.0';
    public requiredCapabilities = [];

    private engine = new TemplateEngine();

    public async execute(input: SkillInput): Promise<SkillResult> {
        try {
            const template: string = input.parameters?.template;
            if (typeof template !== 'string') {
                return {
                    status: 'failed',
                    errors: [{ code: 'INVALID_INPUT', message: 'Missing or invalid template string in parameters.' }]
                };
            }

            const variables = input.variables || {};
            const result = this.engine.render({ template, variables });

            return {
                status: 'success',
                output: result.renderedText,
                warnings: result.warnings,
                artifacts: [
                    {
                        name: 'template_output.txt',
                        content: result.renderedText
                    }
                ]
            };
        } catch (error: any) {
            return {
                status: 'failed',
                errors: [{ code: 'EXECUTION_ERROR', message: error.message }]
            };
        }
    }
}
