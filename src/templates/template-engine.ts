import { TemplateRenderInput, TemplateRenderResult } from './types.js';

export class TemplateEngine {
    public render(input: TemplateRenderInput): TemplateRenderResult {
        const warnings: string[] = [];
        const pattern = /\{\{([\w.]+)\}\}/g;

        const renderedText = input.template.replace(pattern, (match, path) => {
            const value = this.getValueByPath(input.variables, path);
            if (value === undefined || value === null) {
                warnings.push(`Warning: Missing variable '${path}'`);
                return '';
            }
            return String(value);
        });

        return {
            renderedText,
            warnings
        };
    }

    private getValueByPath(obj: any, path: string): any {
        if (!obj || typeof obj !== 'object') {
            return undefined;
        }
        
        const keys = path.split('.');
        let current = obj;
        
        for (const key of keys) {
            if (current === undefined || current === null) {
                return undefined;
            }
            current = current[key];
        }
        
        return current;
    }
}
