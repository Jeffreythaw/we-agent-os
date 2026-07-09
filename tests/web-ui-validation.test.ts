import { describe, it, expect } from 'vitest';
import { validateServiceReport } from '../web-app/src/validation.js'; // Ensure .js extension is used if needed or let typescript handle it. Wait, in vite/vitest, .ts resolves fine.

describe('Web UI Validation Acceptance Test', () => {
    it('should reject invalid reference number', () => {
        const errors = validateServiceReport({ referenceNo: 'SVC/HBL/123/12' }, ['Photo 1']);
        expect(errors['referenceNo']).toBeDefined();
        expect(errors['referenceNo']).toContain('Format must be SVC/HBL/MMYYYY/NNN');
    });

    it('should reject future service date', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 5);
        const errors = validateServiceReport({ serviceDate: futureDate.toISOString().split('T')[0] }, ['Photo 1']);
        expect(errors['serviceDate']).toBeDefined();
        expect(errors['serviceDate']).toBe('Service date cannot be in the future');
    });

    it('should reject missing photo caption', () => {
        const errors = validateServiceReport({}, ['   ']);
        expect(errors['photos']).toBeDefined();
        expect(errors['photos']).toBe('All photos must have a caption');
    });

    it('should reject missing required fields', () => {
        const errors = validateServiceReport({}, ['Photo 1']);
        expect(errors['projectCode']).toBeDefined();
        expect(errors['client']).toBeDefined();
        expect(errors['workDescription']).toBeDefined();
    });

    it('should pass with valid data', () => {
        const validData = {
            referenceNo: 'SVC/HBL/072026/001',
            projectCode: 'HBL',
            reportCategory: 'ROUTINE_CONTRACT_SERVICE',
            client: 'HarbourLink',
            serviceDate: '2026-07-08',
            technicianName: 'John',
            equipment: 'FCU/AHU',
            workDescription: 'Work',
            findings: 'Findings',
            finalOperatingCondition: 'Good'
        };
        const errors = validateServiceReport(validData, ['Photo 1']);
        expect(Object.keys(errors).length).toBe(0);
    });
});
