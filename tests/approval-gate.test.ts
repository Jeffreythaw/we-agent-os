import { describe, it, expect } from 'vitest';
import { ApprovalGate } from '../src/approval/approval-gate.js';
import { ApprovalStatus } from '../src/approval/types.js';

describe('ApprovalGate', () => {
    it('should create a pending approval request', () => {
        const gate = new ApprovalGate();
        const req = gate.requestApproval('write', 'Need to save file');
        
        expect(req.id).toBeDefined();
        expect(req.action).toBe('write');
        expect(req.status).toBe(ApprovalStatus.PENDING);
        
        const fetched = gate.getRequest(req.id);
        expect(fetched).toBeDefined();
        expect(fetched?.status).toBe(ApprovalStatus.PENDING);
    });

    it('should approve a request', () => {
        const gate = new ApprovalGate();
        const req = gate.requestApproval('deploy', 'Deploying to prod');
        
        gate.approve(req.id);
        const fetched = gate.getRequest(req.id);
        expect(fetched?.status).toBe(ApprovalStatus.APPROVED);
    });

    it('should reject a request', () => {
        const gate = new ApprovalGate();
        const req = gate.requestApproval('send_email', 'Sending spam');
        
        gate.reject(req.id);
        const fetched = gate.getRequest(req.id);
        expect(fetched?.status).toBe(ApprovalStatus.REJECTED);
    });

    it('should throw error when approving a non-existent request', () => {
        const gate = new ApprovalGate();
        expect(() => gate.approve('invalid-id')).toThrow(/not found/);
    });
});
