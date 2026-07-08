import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { AuditLogger } from '../src/audit/audit-logger.js';
import { LogLevel } from '../src/audit/types.js';

describe('AuditLogger', () => {
    const testDir = path.join(process.cwd(), 'tests', 'temp');
    
    beforeAll(async () => {
        await fs.mkdir(testDir, { recursive: true });
    });
    
    afterAll(async () => {
        await fs.rm(testDir, { recursive: true, force: true });
    });

    it('should append log entries to a JSONL file', async () => {
        const logger = new AuditLogger(testDir);
        await logger.initialize();
        
        await logger.append(LogLevel.INFO, 'TestComponent', 'This is a test message', { foo: 'bar' });
        
        const dateStr = new Date().toISOString().split('T')[0];
        const logFile = path.join(testDir, 'logs', `audit-${dateStr}.jsonl`);
        
        const content = await fs.readFile(logFile, 'utf-8');
        const parsed = JSON.parse(content.trim());
        
        expect(parsed.level).toBe(LogLevel.INFO);
        expect(parsed.component).toBe('TestComponent');
        expect(parsed.message).toBe('This is a test message');
        expect(parsed.metadata.foo).toBe('bar');
        expect(parsed.timestamp).toBeDefined();
    });
});
