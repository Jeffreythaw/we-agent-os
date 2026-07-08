export type RuleOperator = 
    | 'equals' 
    | 'not_equals' 
    | 'contains' 
    | 'not_contains' 
    | 'regex' 
    | 'exists' 
    | 'missing';

export type RuleSeverity = 'info' | 'warning' | 'error';

export interface Rule {
    factKey: string;
    operator: RuleOperator;
    expectedValue?: any;
    severity: RuleSeverity;
    message: string;
}

export interface RuleResult {
    rule: Rule;
    passed: boolean;
    actualValue?: any;
}

export interface RuleEvaluationResult {
    passed: boolean;
    results: RuleResult[];
    failedCount: number;
    warningCount: number;
    errorCount: number;
}
