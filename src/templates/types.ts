export interface TemplateRenderInput {
    template: string;
    variables: Record<string, any>;
}

export interface TemplateRenderResult {
    renderedText: string;
    warnings: string[];
}
