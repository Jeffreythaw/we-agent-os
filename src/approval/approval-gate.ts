import { ApprovalRequest, ApprovalStatus } from './types.js';
import crypto from 'node:crypto';

export class ApprovalGate {
    private requests: Map<string, ApprovalRequest> = new Map();

    public requestApproval(action: string, reason: string, resource?: string): ApprovalRequest {
        const id = crypto.randomUUID();
        const request: ApprovalRequest = {
            id,
            action,
            resource,
            reason,
            status: ApprovalStatus.PENDING,
        };
        
        this.requests.set(id, request);
        return request;
    }

    public getRequest(id: string): ApprovalRequest | undefined {
        return this.requests.get(id);
    }

    public approve(id: string): void {
        const request = this.requests.get(id);
        if (!request) {
            throw new Error(`Approval request ${id} not found`);
        }
        if (request.status !== ApprovalStatus.PENDING) {
            throw new Error(`Approval request ${id} is already ${request.status}`);
        }
        request.status = ApprovalStatus.APPROVED;
    }

    public reject(id: string): void {
        const request = this.requests.get(id);
        if (!request) {
            throw new Error(`Approval request ${id} not found`);
        }
        if (request.status !== ApprovalStatus.PENDING) {
            throw new Error(`Approval request ${id} is already ${request.status}`);
        }
        request.status = ApprovalStatus.REJECTED;
    }
}
