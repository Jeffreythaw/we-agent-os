export enum ApprovalStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

export interface ApprovalRequest {
    id: string;
    action: string;
    resource?: string;
    reason: string;
    status: ApprovalStatus;
}
