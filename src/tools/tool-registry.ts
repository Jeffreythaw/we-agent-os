import { Tool } from './types.js';

export class ToolRegistry {
    private tools: Map<string, Tool> = new Map();

    public register(tool: Tool): void {
        if (this.tools.has(tool.name)) {
            throw new Error(`Tool with name '${tool.name}' is already registered.`);
        }
        this.tools.set(tool.name, tool);
    }

    public get(name: string): Tool | undefined {
        return this.tools.get(name);
    }

    public list(): Tool[] {
        return Array.from(this.tools.values());
    }
}
