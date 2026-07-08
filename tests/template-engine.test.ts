import { describe, it, expect } from 'vitest';
import { TemplateEngine } from '../src/templates/template-engine.js';

describe('TemplateEngine', () => {
    const engine = new TemplateEngine();

    it('should handle simple variable replacement', () => {
        const result = engine.render({
            template: 'Hello {{name}}!',
            variables: { name: 'World' }
        });

        expect(result.renderedText).toBe('Hello World!');
        expect(result.warnings.length).toBe(0);
    });

    it('should handle nested variable replacement', () => {
        const result = engine.render({
            template: 'Project {{project.name}} is {{project.status}}.',
            variables: {
                project: {
                    name: 'Apollo',
                    status: 'active'
                }
            }
        });

        expect(result.renderedText).toBe('Project Apollo is active.');
        expect(result.warnings.length).toBe(0);
    });

    it('should handle missing variables by returning empty string and adding warning', () => {
        const result = engine.render({
            template: 'User: {{user.name}}, Age: {{user.age}}',
            variables: {
                user: {
                    name: 'Alice'
                }
            }
        });

        expect(result.renderedText).toBe('User: Alice, Age: ');
        expect(result.warnings.length).toBe(1);
        expect(result.warnings[0]).toContain("Missing variable 'user.age'");
    });

    it('should be deterministic on multiple renders', () => {
        const input = {
            template: 'ID: {{id}}',
            variables: { id: 42 }
        };

        const result1 = engine.render(input);
        const result2 = engine.render(input);

        expect(result1.renderedText).toBe('ID: 42');
        expect(result2.renderedText).toBe('ID: 42');
        expect(result1.warnings).toEqual(result2.warnings);
    });
});
