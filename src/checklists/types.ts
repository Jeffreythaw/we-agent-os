import { Rule, RuleResult } from '../rules/types.js';

export interface ChecklistItem {
    id: string;
    label: string;
    required: boolean;
    rule: Rule;
}

export interface Checklist {
    id: string;
    name: string;
    description: string;
    items: ChecklistItem[];
}

export interface ChecklistItemResult {
    item: ChecklistItem;
    passed: boolean;
    ruleResult: RuleResult;
}

export interface ChecklistEvaluationResult {
    checklistId: string;
    checklistName: string;
    passed: boolean;
    itemResults: ChecklistItemResult[];
    requiredFailedCount: number;
    optionalFailedCount: number;
    warningCount: number;
    errorCount: number;
}
