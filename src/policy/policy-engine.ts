import { PolicyDecision, PolicyInput } from './types.js';

export class PolicyEngine {
    public evaluateRequest(input: PolicyInput): PolicyDecision {
        switch (input.action) {
            case 'read':
                return PolicyDecision.ALLOW;
            case 'write':
            case 'deploy':
            case 'send_email':
            case 'database_write':
            case 'paid_model':
                return PolicyDecision.REQUIRE_APPROVAL;
            case 'delete':
            case 'secret_access':
                return PolicyDecision.DENY;
            default:
                // Default unknown actions to require approval for safety
                return PolicyDecision.REQUIRE_APPROVAL;
        }
    }
}
